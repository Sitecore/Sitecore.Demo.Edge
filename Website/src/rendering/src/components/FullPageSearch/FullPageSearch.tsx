import debounce from '../../../src/helpers/Debounce';
import FacetList from './FacetList';
import ProductList from '../ShopCommon/ProductList';
import SearchControls from './SearchControls';
import { useEffect } from 'react';
import {
  SearchResultsActions,
  SearchResultsPageNumberChangedActionPayload,
  SearchResultsFacetClickedChangedActionPayload,
  SearchResultsSortChangedActionPayload,
} from '@sitecore-discover/widgets';
import { SearchResultsWidgetProps } from '@sitecore-discover/ui';

interface FullPageSearchResultsProps extends SearchResultsWidgetProps {
  rfkId: string;
}

const FullPageSearch = ({
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
  const setInitialKeyphrase: (keyphrase: string) => void = debounce(
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
      setInitialKeyphrase(keyphraseToUse);
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
      rfkId: 'rfkid_7',
      page: Number(pageNumber),
    };
    onPageNumberChange(pageNo);
  };

  const handleSortChange = (payload: SearchResultsSortChangedActionPayload) => {
    onSortChange(payload);
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
