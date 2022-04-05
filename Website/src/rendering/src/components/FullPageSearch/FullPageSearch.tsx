import debounce from '../../../src/helpers/Debounce';
import FacetList, { FacetClickEvent } from './FacetList';
import ProductList from '../ShopCommon/ProductList';
import SearchControls from './SearchControls';
import { Product } from 'src/models/discover/Product';
import { useEffect } from 'react';
import { SearchResultsActions } from '@sitecore-discover/widgets';

type FullPageSearchProps = {
  error: unknown;
  loaded: boolean;
  loading: boolean;
  page: number;
  keyphrase: string;
  productsPerPage: number;
  totalPages: number;
  totalItems: unknown;
  sortType: unknown;
  sortDirection: unknown;
  sortChoices: unknown[];
  products: Product[];
  facets: unknown[];
  onSearchChange: () => void;
  dispatch: (...args: unknown[]) => void;
};

type SortChangeEvent = {
  sortDirection: string;
  sortType: string;
};

const FullPageSearch = (props: FullPageSearchProps): JSX.Element => {
  const {
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
    dispatch,
  } = props;

  const setInitialKeyphrase: (keyphrase: string) => void = debounce(
    (keyphrase) =>
      dispatch(SearchResultsActions.KEYPHRASE_CHANGED, {
        keyphrase,
      }),
    500,
    false
  );

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const searchQuery = urlSearchParams.get('q');
    const keyphraseToUse = keyphrase ?? searchQuery;
    if (keyphraseToUse) {
      setInitialKeyphrase(keyphraseToUse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>Response error</div>;
  }

  const handleFacetClick = (payload: FacetClickEvent) => {
    dispatch(SearchResultsActions.FACET_CLICKED, payload);
  };

  const handleFacetClear = (payload: PointerEvent) => {
    dispatch(SearchResultsActions.CLEAR_FILTERS, payload);
  };

  const handlePageNumberChange = (pageNumber: string) => {
    dispatch(SearchResultsActions.PAGE_NUMBER_CHANGED, {
      pageNumber: Number(pageNumber),
    });
  };

  const handleSortChange = (payload: SortChangeEvent) => {
    dispatch(SearchResultsActions.SORT_CHANGED, payload);
  };

  const numberOfResults = !loading && totalPages > 0 && (
    <div className="items-num">{totalItems} items</div>
  );

  const noResultsMessage = totalItems === 0 && 'No results found';

  return (
    <div className="full-page-search">
      <div className="full-page-search-container">
        <div className="full-page-search-left">
          <FacetList facets={facets} onFacetClick={handleFacetClick} onClear={handleFacetClear} />
        </div>
        <div className="full-page-search-right">
          <div data-page={page}>
            <div className="full-page-search-controls">
              {numberOfResults}
              <SearchControls
                totalPages={totalPages}
                page={page}
                sortChoices={sortChoices}
                sortType={sortType}
                sortDirection={sortDirection}
                onPageNumberChange={handlePageNumberChange}
                onSortChange={handleSortChange}
              />
            </div>
            {noResultsMessage}
            <ProductList products={products} loaded={loaded} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageSearch;
