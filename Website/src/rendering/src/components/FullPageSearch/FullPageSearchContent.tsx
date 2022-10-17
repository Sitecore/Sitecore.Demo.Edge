import Head from 'next/head';
import FacetList from './FacetList';
import ProductList from '../ShopCommon/ProductList';
import SearchControls from './SearchControls';
import { ChangeEvent, useState } from 'react';
import CategoryHero from '../Products/CategoryHero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FullPageSearchResultsProps } from './FullPageSearch';
import { Category } from '../../models/Category';
import { Product } from '../../models/discover/Product';
import { SearchResultsSortChangedActionPayload } from '@sitecore-discover/widgets';
import { SearchResponseSortChoice } from '@sitecore-discover/models';
import { SearchResponseFacets } from '@sitecore-discover/react';

type FullPageSearchContentProps = Partial<FullPageSearchResultsProps> & {
  page: number;
  keyphrase: string;
  productsPerPage: number;
  sortType: string;
  sortDirection: string;
  sortChoices: SearchResponseSortChoice[];
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  totalItems: number;
  totalPages: number;
  facets: SearchResponseFacets;
  facetNames: string[];
  products: Product[];
  category: Category;
  onPageNumberChange: (obj: { page: number }) => void;
  onSortChange: (obj: { sortType: string; sortDirection: string }) => void;
  onSearchInputChange: (s: string) => void;
};

const FullPageSearchContent = ({
  rfkId,
  page,
  keyphrase,
  productsPerPage,
  sortType,
  sortDirection,
  sortChoices,
  isError,
  isLoading,
  isFetching,
  totalItems,
  totalPages,
  facets,
  facetNames,
  products,
  category,
  onPageNumberChange,
  onSortChange,
  onSearchInputChange,
}: FullPageSearchContentProps): JSX.Element => {
  const isCategoryProductListingPage = rfkId === 'rfkid_10';
  const [toggle, setToggle] = useState(false);

  if (isError) {
    return <div>Response error</div>;
  }

  const handleSortChange = (payload: SearchResultsSortChangedActionPayload) => {
    onSortChange(payload);
  };

  const handleToggleClick = () => {
    const isVisible = !toggle;
    setToggle(isVisible);
    document.body.classList.toggle('shop-facet-panel-open', isVisible);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(e.target.value || '');
  };

  const handleViewMoreClick = () => {
    const pageNumber = Math.ceil(products.length / productsPerPage + 1);

    onPageNumberChange({ page: pageNumber });
  };

  const viewMoreBtnHandler =
    totalPages > 1 && products?.length !== totalItems ? handleViewMoreClick : null;

  const numberOfResults = !isLoading && totalPages > 0 && (
    <div className="items-num">{totalItems} items</div>
  );

  const noResultsMessage = totalItems === 0 && 'No results found';

  const sortFacetProps = {
    sortChoices,
    sortType,
    sortDirection,
    onSortChange: handleSortChange,
  };

  const pageTitle = isCategoryProductListingPage && category ? category.name : 'Products';

  const categoryHero = isCategoryProductListingPage && category && (
    <CategoryHero category={category} />
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
              list={facetNames}
              facets={facets}
              sortFacetProps={sortFacetProps}
              onToggleClick={handleToggleClick}
              isCategoryProductListingPage={isCategoryProductListingPage}
              onSearchInputChange={handleSearchInputChange}
              keyphrase={keyphrase}
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
                    sortChoices={sortChoices}
                    sortType={sortType}
                    sortDirection={sortDirection}
                    onSortChange={handleSortChange}
                  />
                </div>
                <button className="btn-main facet-container-toggle" onClick={handleToggleClick}>
                  <FontAwesomeIcon icon={faSlidersH} />
                  Filter
                </button>
              </div>
              {noResultsMessage}
              <ProductList
                products={products}
                loaded={!isLoading}
                loading={isFetching}
                onViewMoreBtnClick={viewMoreBtnHandler}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FullPageSearchContent;
