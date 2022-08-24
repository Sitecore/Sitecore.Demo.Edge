import { SearchResultsWidgetProps } from '@sitecore-discover/ui';
import { useEffect, useState } from 'react';
import debounce from '../../../src/helpers/Debounce';
import FullPageSearchContent from './FullPageSearchContent';
import { getCategoryByUrlPath } from '../../helpers/CategoriesDataHelper';
// import { Product } from '../../models/discover/Product';
import { isDiscoverEnabled } from '../../services/DiscoverService';
import { CategoriesDataCategory } from '../../models/Category';

export interface FullPageSearchResultsProps extends SearchResultsWidgetProps {
  rfkId: string;
  category?: CategoriesDataCategory;
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
  category, // only passed down for ordercloud
  facets,
  numberOfItems,
  onFacetClick,
  onClearFilters,
  onPageNumberChange,
  onSortChange,
  onKeyphraseChange,
}: FullPageSearchResultsProps): JSX.Element => {
  const useOrderCloudFiltering = !isDiscoverEnabled;
  const isCategoryProductListingPage = rfkId === 'rfkid_10' || Boolean(category);

  // in discover we don't have a good way of retrieving the category information so need to retrived from a well known but static source (data feed)
  // which is a bit of a hack, for ordercloud however we can get via API which is passed down as state variable so just use that
  // ideally discover sdk should provide category information for display
  const displayCategory = useOrderCloudFiltering
    ? category
    : isCategoryProductListingPage && typeof window !== 'undefined'
    ? getCategoryByUrlPath(window.location.pathname)
    : null;

  const [loadedProducts, setLoadedProducts] = useState([]);

  const setKeyphrase: (keyphrase: string) => void = debounce(
    (keyphrase) => onKeyphraseChange({ rfkId: rfkId, keyphrase }),
    500,
    false
  );

  const onSearchInputChange = (keyphrase: string) => {
    setKeyphrase(keyphrase || '');
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
    setLoadedProducts(products || []);
    return;
    // TODO: this caching mechanism was created but is not complete because it doesn't take into account applied filters or sorts
    // and currently this information is not available via Discover
    // this could potentially be implemented by holding that state in a wrapper component to this one

    // if (!loaded && loading) return;

    // const productsFromSessionStorage = loadProductsFromSessionStorage();

    // let productsToDisplay = [];
    // let initialProducts = [];
    // if (productsFromSessionStorage && products) {
    //   if (isCategoryProductListingPage) {
    //     productsToDisplay = [...productsFromSessionStorage, ...products];
    //   } else {
    //     // BUG: Discover initially sends back a full page of products - currently 10, not relevant
    //     // to the keyphrase, and then updates the products with the correct ones
    //     initialProducts = productsFromSessionStorage.splice(0, 10);
    //     productsToDisplay = [...productsFromSessionStorage, ...products];
    //   }
    //   // Filter the products so that we don't include duplicates when refreshing the page
    //   productsToDisplay = productsToDisplay.filter(
    //     (value: Product, index: number, self: Product[]) =>
    //       self.findIndex((v) => v.sku === value.sku) === index
    //   );
    // } else if (products) {
    //   productsToDisplay = products;
    // } else {
    //   return;
    // }
    // setLoadedProducts(productsToDisplay);
    // saveProductsToSessionStorage(
    //   isCategoryProductListingPage ? productsToDisplay : [...initialProducts, ...productsToDisplay]
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // const getSessionStorageKey = (): string => {
  //   if (isCategoryProductListingPage && keyphrase) {
  //     return `${category.ccid} - ${keyphrase} products`;
  //   } else if (isCategoryProductListingPage && category) {
  //     return `${category.ccid} products`;
  //   } else {
  //     return `${keyphrase} products`;
  //   }
  // };

  // const saveProductsToSessionStorage = (products: Product[]) => {
  //   sessionStorage.setItem(getSessionStorageKey(), JSON.stringify(products));
  // };

  // const loadProductsFromSessionStorage = () =>
  //   JSON.parse(sessionStorage.getItem(getSessionStorageKey()));

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
      onFacetClick={onFacetClick}
      onClearFilters={onClearFilters}
      onPageNumberChange={onPageNumberChange}
      onSortChange={onSortChange}
      onSearchInputChange={onSearchInputChange}
      category={displayCategory}
    />
  );
};

export default FullPageSearch;
