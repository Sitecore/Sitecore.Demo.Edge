import { useEffect, useState } from 'react';
import { SearchResultsPageNumberChangedActionPayload } from '@sitecore-discover/widgets';
import FullPageSearchContent from './FullPageSearchContent';
import { getCategoryByUrlPath } from '../../helpers/CategoriesDataHelper';
import { Product } from '../../models/discover/Product';
import { useRouter } from 'next/router';

import {
  SearchResponseFacets,
  SearchResponseProduct,
  useSearchResults,
  widget,
  WidgetDataType,
} from '@sitecore-discover/react';

export interface FullPageSearchResultsProps {
  rfkId: string;
}

export const FullPageSearch = ({ rfkId }: FullPageSearchResultsProps): JSX.Element => {
  const {
    actions: { onKeyphraseChange, onPageNumberChange, onSortChange },
    context: { page = 1, keyphrase = '', productsPerPage = 10, sortType, sortDirection },
    queryResult: {
      isError,
      isLoading,
      isFetching,
      data: {
        sort: { choices: sortChoices = [] } = {},
        total_item: totalItems = 0,
        total_page: totalPages = 0,
        facet: facets = [] as unknown as SearchResponseFacets,
        facet_names: facetNames = [],
        content: { product: { value: products = [] } = {} } = {},
      } = {},
    },
    query,
  } = useSearchResults((query) => {
    query.getRequest();
    return {
      productsPerPage,
      keyphrase,
    };
  });

  const router = useRouter();
  const isCategoryProductListingPage = rfkId === 'rfkid_10';
  const category = getCategoryByUrlPath(window.location.pathname);

  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isViewMoreClicked, setIsViewMoreClicked] = useState(false);
  const [displayedKeyphrase, setDisplayedKeyphrase] = useState(keyphrase || '');

  const onSearchInputChange = (keyphrase: string) => {
    setDisplayedKeyphrase(keyphrase);

    // Update the keyphrase in session storage
    saveLastProductListingPage(keyphrase);

    query.getRequest();
    onKeyphraseChange({ keyphrase });
  };

  const onViewMoreClick = (payload: SearchResultsPageNumberChangedActionPayload) => {
    setIsViewMoreClicked(true);

    onPageNumberChange(payload);
  };

  useEffect(() => {
    // Clear the filters when visiting another product listing page

    if (router.asPath !== loadLastProductListingPage()?.path) {
      // onClearFilters();
      onSearchInputChange('');
      onSortChange({
        sortType: 'featured',
        sortDirection: 'desc',
      });

      // Save the product listing page to session storage
      saveLastProductListingPage();
    }

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
    if (isLoading || isFetching) return;
    if (!products) return;

    let productsToDisplay: (SearchResponseProduct | Product)[] = [];
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

  const saveProductsToSessionStorage = (products: (SearchResponseProduct | Product)[]) => {
    sessionStorage.setItem('products', JSON.stringify(products));
  };

  const loadProductsFromSessionStorage = (): (SearchResponseProduct | Product)[] =>
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
      page={page}
      keyphrase={displayedKeyphrase}
      productsPerPage={productsPerPage}
      sortType={sortType}
      sortDirection={sortDirection}
      sortChoices={sortChoices}
      isError={isError}
      isLoading={isLoading}
      isFetching={isFetching}
      totalItems={totalItems}
      totalPages={totalPages}
      facets={facets}
      facetNames={facetNames}
      products={loadedProducts}
      category={category}
      onPageNumberChange={onViewMoreClick}
      onSortChange={onSortChange}
      onSearchInputChange={onSearchInputChange}
    />
  );
};

export default widget(FullPageSearch, WidgetDataType.SEARCH_RESULTS);
