import { SearchResultsWidgetProps } from '@sitecore-discover/ui';
import { useEffect, useState } from 'react';
import debounce from '../../../src/helpers/Debounce';
import {
  SearchResultsActions,
  SearchResultsPageNumberChangedActionPayload,
} from '@sitecore-discover/widgets';
import FullPageSearchContent from './FullPageSearchContent';
import { getCategoryByUrlPath } from '../../helpers/CategoriesDataHelper';
import { Product } from '../../models/discover/Product';
import { useRouter } from 'next/router';

export interface FullPageSearchResultsProps extends SearchResultsWidgetProps {
  rfkId: string;
}

const FullPageSearch = ({
  rfkId,
  error,
  loaded,
  loading,
  page,
  keyphrase,
  totalPages,
  totalItems,
  sortType,
  sortDirection,
  sortChoices,
  products,
  facets,
  numberOfItems,
  dispatch,
  onFacetClick,
  onClearFilters,
  onPageNumberChange,
  onSortChange,
}: FullPageSearchResultsProps): JSX.Element => {
  const router = useRouter();

  const isCategoryProductListingPage = rfkId === 'rfkid_10';
  const category = getCategoryByUrlPath(window.location.pathname);

  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isViewMoreClicked, setIsViewMoreClicked] = useState(false);
  const [displayedKeyphrase, setDisplayedKeyphrase] = useState(keyphrase || '');

  const setKeyphrase: (keyphrase: string) => void = debounce(
    (keyphrase) =>
      dispatch({ type: SearchResultsActions.KEYPHRASE_CHANGED, payload: { keyphrase } }),
    500,
    false
  );

  const onSearchInputChange = (keyphrase: string) => {
    setKeyphrase(keyphrase);
    setDisplayedKeyphrase(keyphrase);

    // Update the keyphrase in session storage
    saveLastProductListingPage(keyphrase);
  };

  const onViewMoreClick = (payload: SearchResultsPageNumberChangedActionPayload) => {
    setIsViewMoreClicked(true);

    onPageNumberChange(payload);
  };

  useEffect(() => {
    // Clear the filters when visiting another product listing page
    if (router.asPath !== loadLastProductListingPage()?.path) {
      onClearFilters();
      onSearchInputChange('');
      onSortChange({
        rfkId,
        sortType: 'featured',
        sortDirection: 'desc',
      });

      // Save the product listing page to session storage
      saveLastProductListingPage();
    }

    // Set the page number to 1 initially
    onPageNumberChange({
      rfkId,
      page: 1,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (isCategoryProductListingPage) {
      // Set the initial keyphrase only if the page is not the same as the previously visited one,
      // otherwise the filters will be lost
      if (keyphrase && router.asPath !== loadLastProductListingPage()?.path) {
        onSearchInputChange(keyphrase);
      }
    } else {
      // Search query exists only on global search page
      const searchQuery = router.query.q as string;
      if (searchQuery && searchQuery !== loadLastProductListingPage()?.keyphrase) {
        onSearchInputChange(searchQuery);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (!loaded && loading) return;
    if (!products) return;

    let productsToDisplay: Product[] = [];
    if (isViewMoreClicked) {
      setIsViewMoreClicked(false);

      const productsFromSessionStorage = loadProductsFromSessionStorage();
      productsToDisplay = [...productsFromSessionStorage, ...products];
    } else {
      productsToDisplay = products;
    }
    setLoadedProducts(productsToDisplay);
    saveProductsToSessionStorage(productsToDisplay);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const saveProductsToSessionStorage = (products: Product[]) => {
    sessionStorage.setItem('products', JSON.stringify(products));
  };

  const loadProductsFromSessionStorage = (): Product[] =>
    JSON.parse(sessionStorage.getItem('products'));

  const saveLastProductListingPage = (keyphrase?: string): void =>
    sessionStorage.setItem(
      isCategoryProductListingPage ? 'lastCategoryProductListingPage' : 'lastProductListingPage',
      JSON.stringify({
        keyphrase,
        path: router.asPath,
      })
    );

  const loadLastProductListingPage = (): { keyphrase: string; path: string } =>
    JSON.parse(
      sessionStorage.getItem(
        isCategoryProductListingPage ? 'lastCategoryProductListingPage' : 'lastProductListingPage'
      )
    );

  return (
    <FullPageSearchContent
      rfkId={rfkId}
      error={error}
      loaded={loaded}
      loading={loading}
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      sortType={sortType}
      sortDirection={sortDirection}
      sortChoices={sortChoices}
      products={loadedProducts}
      facets={facets}
      numberOfItems={numberOfItems}
      dispatch={dispatch}
      onFacetClick={onFacetClick}
      onClearFilters={onClearFilters}
      onPageNumberChange={onViewMoreClick}
      onSortChange={onSortChange}
      onSearchInputChange={onSearchInputChange}
      keyphrase={displayedKeyphrase}
      category={category}
    />
  );
};

export default FullPageSearch;
