import Head from 'next/head';
import debounce from '../../../src/helpers/Debounce';
import FacetList from './FacetList';
import ProductList from '../ShopCommon/ProductList';
import SearchControls from './SearchControls';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  SearchResultsActions,
  SearchResultsPageNumberChangedActionPayload,
  SearchResultsFacetClickedChangedActionPayload,
  SearchResultsSortChangedActionPayload,
} from '@sitecore-discover/widgets';
import { SearchResultsWidgetProps } from '@sitecore-discover/ui';
import CategoryHero from '../Products/CategoryHero';

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

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyphrase(e.target.value || '');
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

  // TODO: Replace this with category from SDK response
  let categoryName = '';
  if (typeof window !== 'undefined') {
    const urlSegments = window.location.href.split('/');
    const category = urlSegments[urlSegments.length - 1];
    categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  }

  const pageTitle = isCategoryProductListingPage ? categoryName : 'Products';

  const categoryHero = isCategoryProductListingPage && (
    /* TODO: Replace props with data from Discover SDK */
    <CategoryHero categoryName={categoryName} categoryDescription="Category Description" />
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
              facets={facets}
              onFacetClick={handleFacetClick}
              onClear={handleFacetClear}
              sortFacetProps={sortFacetProps}
              onToggleClick={handleToggleClick}
              isCategoryProductListingPage={isCategoryProductListingPage}
              onSearchInputChange={handleSearchInputChange}
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
      </section>
    </>
  );
};

export default FullPageSearch;
