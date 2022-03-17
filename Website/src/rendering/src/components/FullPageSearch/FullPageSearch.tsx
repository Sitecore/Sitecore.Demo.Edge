import debounce from '../../../src/helpers/Debounce';
import FacetList from './FacetList';
import ProductList from './ProductList';
import SearchControls from './SearchControls';

type SearchResultsProps = {
  error: unknown;
  loaded: boolean;
  loading: boolean;
  page: any;
  keyphrase: unknown;
  productsPerPage: any;
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

const SearchResults = (props: SearchResultsProps): JSX.Element => {
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
    onSearchChange,
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
  <div className="rfk-full-page-search">
        ${
          keyphrase
            ? window.RFK.ui
                .html`<div className="rfk_msg_prod">Top Results for: «${keyphrase}»</div>`
            : null
        }
        <div className="rfk_sp rfk-sp">
          <${FacetList}
            facets=${facets}
            onFacetClick=${(payload: any) => {
              dispatch(window.RFK.widgets.SearchResultsActions.FACET_CLICKED, payload);
            }}
            onClear=${(payload: any) => {
              dispatch(window.RFK.widgets.SearchResultsActions.CLEAR_FILTERS, payload);
            }}
          />
          <div className="rfk_li" data-page="${page}">
            <${SearchControls}
              keyphrase=${keyphraseToUse}
              productsPage=${productsPerPage}
              page=${page}
              sortType=${sortType}
              totalPages=${totalPages}
              sortDirection=${sortDirection}
              sortChoices=${sortChoices}
              onPerPageChange=${(numProducts: any) => {
                dispatch(window.RFK.widgets.SearchResultsActions.RESULTS_PER_PAGE_CHANGED, {
                  numProducts: Number(numProducts),
                });
              }}
              onPageNumberChange=${(pageNumber: any) => {
                dispatch(window.RFK.widgets.SearchResultsActions.PAGE_NUMBER_CHANGED, {
                  pageNumber: Number(pageNumber),
                });
              }}
              onSortChange=${(payload: any) => {
                dispatch(window.RFK.widgets.SearchResultsActions.SORT_CHANGED, payload);
              }}
              onSearchChange=${onSearchChangeDebounced}
            />
            ${
              !loading && totalPages > 0
                ? window.RFK.ui.html`<div className="rfk_sp_results_info">
                  <span>Shown ${
                    page < totalPages ? page * productsPerPage : totalItems
                  } products out of ${totalItems};</span
                  >
                  <span>Page ${page} of ${totalPages}</span>
                </div>`
                : null
            }
            ${totalItems === 0 ? 'No results found' : null}
            <${ProductList}
              products=${products}
              loaded=${loaded}
              loading=${loading}
              onProductClick=${(payload: any) => {
                dispatch(window.RFK.widgets.SearchResultsActions.PRODUCT_CLICKED, payload);
              }}
            />
          </div>
        </div>
      </div>
  `;
};

export default SearchResults;
