import { SearchResultsWidgetProps } from '@sitecore-discover/ui';
import { useEffect, useState } from 'react';
import debounce from '../../../src/helpers/Debounce';
import { SearchResultsActions } from '@sitecore-discover/widgets';
import FullPageSearchContent from './FullPageSearchContent';
import { getCategoryByUrlPath } from '../../helpers/CategoriesDataHelper';
import { Product } from '../../models/discover/Product';

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
  const isCategoryProductListingPage = rfkId === 'rfkid_10';

  const category = getCategoryByUrlPath(window.location.pathname);

  const [loadedProducts, setLoadedProducts] = useState([]);

  const setKeyphrase: (keyphrase: string) => void = debounce(
    (keyphrase) =>
      dispatch({ type: SearchResultsActions.KEYPHRASE_CHANGED, payload: { keyphrase } }),
    500,
    false
  );

  const onSearchInputChange = (keyphrase: string) => {
    setKeyphrase(keyphrase);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const searchQuery = urlSearchParams.get('q');
    const keyphraseToUse = keyphrase ?? searchQuery;
    if (keyphraseToUse) {
      setKeyphrase(keyphraseToUse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loaded && loading) return;

    const productsFromSessionStorage = loadProductsFromSessionStorage();

    let productsToDisplay = [];
    let initialProducts = [];
    if (productsFromSessionStorage && products) {
      if (isCategoryProductListingPage) {
        productsToDisplay = [...productsFromSessionStorage, ...products];
      } else {
        // BUG: Discover initially sends back a full page of products - currently 10, not relevant
        // to the keyphrase, and then updates the products with the correct ones
        initialProducts = productsFromSessionStorage.splice(0, 10);
        productsToDisplay = [...productsFromSessionStorage, ...products];
      }
      // Filter the products so that we don't include duplicates when refreshing the page
      productsToDisplay = productsToDisplay.filter(
        (value: Product, index: number, self: Product[]) =>
          self.findIndex((v) => v.sku === value.sku) === index
      );
    } else if (products) {
      productsToDisplay = products;
    } else {
      return;
    }
    setLoadedProducts(productsToDisplay);
    saveProductsToSessionStorage(
      isCategoryProductListingPage ? productsToDisplay : [...initialProducts, ...productsToDisplay]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const getSessionStorageKey = (): string => {
    if (isCategoryProductListingPage && keyphrase) {
      return `${category.ccid} - ${keyphrase} products`;
    } else if (isCategoryProductListingPage) {
      return `${category.ccid} products`;
    } else {
      return `${keyphrase} products`;
    }
  };

  const saveProductsToSessionStorage = (products: Product[]) => {
    sessionStorage.setItem(getSessionStorageKey(), JSON.stringify(products));
  };

  const loadProductsFromSessionStorage = () =>
    JSON.parse(sessionStorage.getItem(getSessionStorageKey()));

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
      onPageNumberChange={onPageNumberChange}
      onSortChange={onSortChange}
      onSearchInputChange={onSearchInputChange}
      category={category}
    />
  );
};

export default FullPageSearch;
