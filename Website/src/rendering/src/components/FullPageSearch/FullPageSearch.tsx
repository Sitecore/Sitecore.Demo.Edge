import debounce from '../../../src/helpers/Debounce';
import FacetList, { FacetClickEvent } from './FacetList';
import ProductList from '../Products/ProductList';
import SearchControls from './SearchControls';

type FullPageSearchProps = {
  error: unknown;
  loaded: boolean;
  loading: boolean;
  page: number;
  keyphrase: unknown;
  productsPerPage: number;
  totalPages: unknown;
  totalItems: unknown;
  sortType: unknown;
  sortDirection: unknown;
  sortChoices: unknown;
  products: unknown[];
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

  window.RFK.ui.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const searchQuery = urlSearchParams.get('q');
    const keyphraseToUse = keyphrase ?? searchQuery;

    if (keyphraseToUse) {
      setInitialKeyphrase(keyphraseToUse);
    }
  }, []);

  const setInitialKeyphrase = window.RFK.ui.useCallback(
    debounce(
      (keyphrase) =>
        dispatch(window.RFK.widgets.SearchResultsActions.KEYPHRASE_CHANGED, {
          keyphrase,
        }),
      500,
      false
    ),
    []
  );

  if (error) {
    return window.RFK.ui.html`<div>Response error</div>`;
  }

  const handleFacetClick = (payload: FacetClickEvent) => {
    dispatch(window.RFK.widgets.SearchResultsActions.FACET_CLICKED, payload);
  };

  const handleFacetClear = (payload: PointerEvent) => {
    dispatch(window.RFK.widgets.SearchResultsActions.CLEAR_FILTERS, payload);
  };

  const handlePageNumberChange = (pageNumber: string) => {
    dispatch(window.RFK.widgets.SearchResultsActions.PAGE_NUMBER_CHANGED, {
      pageNumber: Number(pageNumber),
    });
  };

  const handleSortChange = (payload: SortChangeEvent) => {
    dispatch(window.RFK.widgets.SearchResultsActions.SORT_CHANGED, payload);
  };

  const handleProductClick = (payload: PointerEvent) => {
    dispatch(window.RFK.widgets.SearchResultsActions.PRODUCT_CLICKED, payload);
  };

  const numberOfResults =
    !loading &&
    totalPages > 0 &&
    window.RFK.ui.html`
      <div className="items-num">
        ${totalItems} items
      </div>
    `;

  const noResultsMessage = totalItems === 0 && 'No results found';

  return window.RFK.ui.html`
    <div className="full-page-search">
      <div className="full-page-search-container">
        <div className="full-page-search-left">
          <${FacetList}
            facets=${facets}
            onFacetClick=${handleFacetClick}
            onClear=${handleFacetClear}
          />
        </div>
        <div className="full-page-search-right">
          <div data-page="${page}">
            <div className="full-page-search-controls">
              ${numberOfResults}
              <${SearchControls}
                totalPages=${totalPages}
                page=${page}
                sortChoices=${sortChoices}
                sortType=${sortType}
                sortDirection=${sortDirection}
                onPageNumberChange=${handlePageNumberChange}
                onSortChange=${handleSortChange}
              />
            </div>
            ${noResultsMessage}
            <${ProductList}
              products=${products}
              loaded=${loaded}
              loading=${loading}
              onProductClick=${handleProductClick}
            />
          </div>
        </div>
      </div>
    </div>
  `;
};

export default FullPageSearch;
