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
  const category = getCategoryByUrlPath(window.location.pathname);

  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isViewMoreClicked, setIsViewMoreClicked] = useState(false);

  const setKeyphrase: (keyphrase: string) => void = debounce(
    (keyphrase) =>
      dispatch({ type: SearchResultsActions.KEYPHRASE_CHANGED, payload: { keyphrase } }),
    500,
    false
  );

  const onSearchInputChange = (keyphrase: string) => {
    setKeyphrase(keyphrase);
  };

  const onViewMoreClick = (payload: SearchResultsPageNumberChangedActionPayload) => {
    setIsViewMoreClicked(true);

    onPageNumberChange(payload);
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
      category={category}
    />
  );
};

export default FullPageSearch;
