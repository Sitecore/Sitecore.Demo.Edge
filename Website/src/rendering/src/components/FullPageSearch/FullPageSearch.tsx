import debounce from '../../../src/helpers/Debounce';
import FacetList from './FacetList';
import ProductList from '../ShopCommon/ProductList';
import SearchControls from './SearchControls';
import { useEffect, useState } from 'react';
import {
  SearchResultsActions,
  SearchResultsPageNumberChangedActionPayload,
  SearchResultsFacetClickedChangedActionPayload,
  SearchResultsSortChangedActionPayload,
} from '@sitecore-discover/widgets';
import { SearchResultsWidgetProps } from '@sitecore-discover/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface FullPageSearchResultsProps extends SearchResultsWidgetProps {
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
  dispatch,
  onFacetClick,
  onClearFilters,
  onPageNumberChange,
  onSortChange,
}: FullPageSearchResultsProps): JSX.Element => {
  const isCategoryProductListingPage = rfkId === 'rfkid_10';

  const [toggle, setToggle] = useState(false);

  const setKeyphrase: (keyphrase: string) => void = debounce(
    (keyphrase) =>
      dispatch({ type: SearchResultsActions.KEYPHRASE_CHANGED, payload: { keyphrase } }),
    500,
    false
  );

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const searchQuery = urlSearchParams.get('q');
    const keyphraseToUse = keyphrase ?? searchQuery;
    if (keyphraseToUse) {
      setKeyphrase(keyphraseToUse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>Response error</div>;
  }

  const handleFacetClick = (payload: SearchResultsFacetClickedChangedActionPayload) => {
    onFacetClick(payload);
  };

  const handleFacetClear = () => {
    onClearFilters();
  };

  const handlePageNumberChange = (pageNumber: string) => {
    const pageNo: SearchResultsPageNumberChangedActionPayload = {
      rfkId,
      page: Number(pageNumber),
    };
    onPageNumberChange(pageNo);
  };

  const handleSortChange = (payload: SearchResultsSortChangedActionPayload) => {
    onSortChange(payload);
  };

  const handleToggleClick = () => {
    const isVisible = !toggle;
    setToggle(isVisible);
    document.body.classList.toggle('shop-facet-panel-open', isVisible);
  };

  const numberOfResults = !loading && totalPages > 0 && (
    <div className="items-num">{totalItems} items</div>
  );

  const noResultsMessage = totalItems === 0 && 'No results found';

  const sortFacetProps = {
    sortChoices,
    sortType,
    sortDirection,
    onSortChange: handleSortChange,
  };

  // TO-DO - Replace this with category from SDK response
  let categoryName = '';
  if (typeof window !== 'undefined') {
    const urlSegments = window.location.href.split('/');
    const category = urlSegments[urlSegments.length - 1];
    categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  }

  return (
    <div className="full-page-search">
      {isCategoryProductListingPage && (
        <section className="categories-list categories-list-blue">
          <div className="categories-list-title">
            {/* TO-DO: Replace with category name from Discover SDK */}
            <h1>{categoryName}</h1>
            {/* TO-DO: Replace with category description from Discover SDK */}
            <p>Category Description</p>
          </div>
        </section>
      )}
      <div className="full-page-search-container">
        <div className="facet-panel-mask"></div>
        <div className="full-page-search-left">
          {isCategoryProductListingPage && (
            <>
              <div className="shop-search-input-container">
                <div id="search-input-container">
                  <FontAwesomeIcon id="search-icon" className="shop-search-icon" icon={faSearch} />
                  <input
                    id="search-input"
                    className="shop-search-input"
                    onChange={(e) => setKeyphrase(e.target.value || '')}
                    placeholder="Search within the list"
                    autoComplete="off"
                  />
                </div>
              </div>
            </>
          )}
          <FacetList
            facets={facets}
            onFacetClick={handleFacetClick}
            onClear={handleFacetClear}
            sortFacetProps={sortFacetProps}
            onToggleClick={handleToggleClick}
          />
          <div className="button-container">
            <button className="btn--main btn--main--round" onClick={handleToggleClick}>
              Show {totalItems} results
            </button>
          </div>
        </div>
        <div className="full-page-search-right">
          <div data-page={page}>
            <div className="full-page-search-header">
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
              <button
                className="btn--main btn--main--round facet-container-toggle"
                onClick={handleToggleClick}
              >
                Filter
              </button>
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
