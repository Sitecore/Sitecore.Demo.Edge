import Head from 'next/head';
import debounce from '../../../src/helpers/Debounce';
import FacetList from './FacetList';
import ProductList from '../ShopCommon/ProductList';
import SearchControls from './SearchControls';
import { useEffect, useState } from 'react';
import {
  SearchResultsPageNumberChangedActionPayload,
  SearchResultsFacetClickedChangedActionPayload,
  SearchResultsSortChangedActionPayload,
} from '@sitecore-discover/widgets';
import { SearchResultsWidgetProps } from '@sitecore-discover/ui';
import CategoryHero from '../Products/CategoryHero';
import { getCategoryByUrlPath } from '../../helpers/CategoriesDataHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { CategoriesDataCategory } from '../../models/Category';
import { isDiscoverEnabled } from '../../helpers/DiscoverHelper';

interface FullPageSearchResultsProps extends Partial<SearchResultsWidgetProps> {
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
  facets,
  category, // only passed down for ordercloud
  onFacetClick,
  onClearFilters,
  onPageNumberChange,
  onSortChange,
  onKeyphraseChange,
}: FullPageSearchResultsProps): JSX.Element => {
  const [toggle, setToggle] = useState(false);
  const isCategoryProductListingPage = rfkId === 'rfkid_10' || Boolean(category);
  const useOrderCloudFiltering = !isDiscoverEnabled;

  const setKeyphrase: (keyphrase: string) => void = debounce(
    (keyphrase) => onKeyphraseChange({ rfkId: rfkId, keyphrase }),
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

  const handleSearchInputChange = (searchTerm: string) => {
    setKeyphrase(searchTerm || '');
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

  // in discover we don't have a good way of retrieving the category information so need to retrived from a well known but static source (data feed)
  // which is a bit of a hack, for ordercloud however we can get via API which is passed down as state variable so just use that
  // ideally discover sdk should provide category information for display
  const displayCategory = useOrderCloudFiltering
    ? category
    : isCategoryProductListingPage && typeof window !== 'undefined'
    ? getCategoryByUrlPath(window.location.pathname)
    : null;

  const pageTitle =
    isCategoryProductListingPage && displayCategory ? displayCategory.name : 'Products';

  const categoryHero = isCategoryProductListingPage && displayCategory && (
    <CategoryHero category={displayCategory} />
  );

  return (
    <>
      <Head>
        <title>PLAY! SHOP - {pageTitle}</title>
      </Head>

      {categoryHero}
      <section className="full-page-search section">
        <div className="full-page-search-container">
          <div className="facet-panel-mask"></div>
          <div className="full-page-search-left">
            <FacetList
              rfkId={rfkId}
              facets={facets}
              onFacetClick={handleFacetClick}
              onClear={handleFacetClear}
              sortFacetProps={sortFacetProps}
              onToggleClick={handleToggleClick}
              isCategoryProductListingPage={isCategoryProductListingPage}
              onSearchInputChange={handleSearchInputChange}
            />
            <div className="button-container">
              <button className="btn-main" onClick={handleToggleClick}>
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
                <button className="btn-main facet-container-toggle" onClick={handleToggleClick}>
                  <FontAwesomeIcon icon={faSlidersH} />
                  Filter
                </button>
              </div>
              {noResultsMessage}
              <ProductList products={products} loaded={loaded} loading={loading} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FullPageSearch;
