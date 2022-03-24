import debounce from '../../../src/helpers/Debounce';
import FacetList from './FacetList';
import ProductList from './ProductList';
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

type FacetClick = {
  checked: boolean;
  facetIndex: number;
  facetType: string;
  facetValue: string;
  facetValueIndex: number;
  valueIndex: number;
};

type SortProps = {
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
    productsPerPage,
    totalPages,
    totalItems,
    sortType,
    sortDirection,
    sortChoices,
    products,
    facets,
    dispatch,
  } = props;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchQuery = urlSearchParams.get('q');
  const keyphraseToUse = keyphrase ?? searchQuery;

  if (error) {
    return window.RFK.ui.html`<div>Response error</div>`;
  }

  const onSearchChangeDebounced = window.RFK.ui.useCallback(
    debounce(
      (keyphrase) =>
        dispatch(window.RFK.widgets.SearchResultsActions.KEYPHRASE_CHANGED, {
          keyphrase,
        }),
      500,
      null
    ),
    []
  );

  return window.RFK.ui.html`
    <div className="full-page-search">
      <div className="full-page-search-container">
        <div className="full-page-search-left">
          <${FacetList}
            facets=${facets}
            onFacetClick=${(payload: FacetClick) => {
              dispatch(window.RFK.widgets.SearchResultsActions.FACET_CLICKED, payload);
            }}
            onClear=${(payload: PointerEvent) => {
              dispatch(window.RFK.widgets.SearchResultsActions.CLEAR_FILTERS, payload);
            }}
          />
        </div>
        <div className="full-page-search-right">
          <div data-page="${page}">
            <div className="full-page-search-controls">
              ${
                !loading && totalPages > 0
                  ? window.RFK.ui.html`
                    <div className="items-num">
                      ${totalItems} items
                    </div>`
                  : null
              }
              <${SearchControls}
                keyphrase=${keyphraseToUse}
                productsPage=${productsPerPage}
                page=${page}
                sortType=${sortType}
                totalPages=${totalPages}
                sortDirection=${sortDirection}
                sortChoices=${sortChoices}
                onPerPageChange=${(numProducts: number) => {
                  dispatch(window.RFK.widgets.SearchResultsActions.RESULTS_PER_PAGE_CHANGED, {
                    numProducts: Number(numProducts),
                  });
                }}
                onPageNumberChange=${(pageNumber: number) => {
                  dispatch(window.RFK.widgets.SearchResultsActions.PAGE_NUMBER_CHANGED, {
                    pageNumber: Number(pageNumber),
                  });
                }}
                onSortChange=${(payload: SortProps) => {
                  dispatch(window.RFK.widgets.SearchResultsActions.SORT_CHANGED, payload);
                }}
                onSearchChange=${onSearchChangeDebounced}
              />
            </div>
            ${totalItems === 0 ? 'No results found' : null}
            <${ProductList}
              products=${products}
              loaded=${loaded}
              loading=${loading}
              onProductClick=${(payload: PointerEvent) => {
                dispatch(window.RFK.widgets.SearchResultsActions.PRODUCT_CLICKED, payload);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  `;
};

export default FullPageSearch;
