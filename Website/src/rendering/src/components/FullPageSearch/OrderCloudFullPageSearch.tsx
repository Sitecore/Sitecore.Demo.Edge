import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FullPageSearch from './FullPageSearch';
import useOcProductList from 'src/hooks/useOcProductList';
import {
  SearchResultsFacetClickedChangedActionPayload,
  SearchResultsPageNumberChangedActionPayload,
  SearchResultsSortChangedActionPayload,
  SearchResultsKeyphraseChangedActionPayload,
} from '@sitecore-discover/widgets';
import { OcProductListOptions, listProducts } from 'src/redux/ocProductList';
import { clone, omit } from 'lodash';
import { useAppDispatch } from 'src/redux/store';

const OrderCloudFullPageSearch = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const productListState = useOcProductList();
  const [rfkid, setRfkid] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [facetFilters, setFacetFilters] = useState<any>({});
  const router = useRouter();

  const buildExistingOptions = (): OcProductListOptions => {
    let sortBy: string[];
    if (productListState.sortType) {
      if (productListState.sortDirection === 'desc') {
        sortBy = [`!${productListState.sortType}`];
      } else {
        sortBy = [productListState.sortType];
      }
    }
    return {
      depth: 'all',
      search: productListState.keyphrase,
      sortBy: sortBy,
      page: productListState.page,
      filters: facetFilters,
    };
  };

  const onFacetClick = ({
    checked,
    facetType,
    facetValue,
  }: SearchResultsFacetClickedChangedActionPayload) => {
    const options = buildExistingOptions();
    const facetKey = `xp.${facetType}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let filters = clone(facetFilters);
    if (checked) {
      if (!filters[facetKey]) {
        // facet has not been selected yet, initialize array
        filters[facetKey] = [facetValue];
      } else {
        // facet has been previously selected but with a different option, so add option to array
        filters[facetKey] = [...filters[facetKey], facetValue];
      }
    } else {
      if (filters[facetKey].length === 1) {
        // only one option selected so just remove the facet filter completely
        filters = omit(filters, facetKey);
      } else {
        // more than one option is selected so remove the option from the existing array
        filters[facetKey] = filters[facetKey].filter((option: string) => option !== facetValue);
      }
    }
    setFacetFilters(filters);
    options.filters = filters;
    options.page = 1;
    dispatch(listProducts(options));
  };

  const onClearFilters = () => {
    const options = {};
    setFacetFilters(options);
    dispatch(listProducts(options));
  };

  const onPageNumberChange = ({ page }: SearchResultsPageNumberChangedActionPayload) => {
    const options = buildExistingOptions();
    options.page = page;
    dispatch(listProducts(options));
  };

  const onSortChange = ({ sortDirection, sortType }: SearchResultsSortChangedActionPayload) => {
    const options = buildExistingOptions();
    let sortBy = '';
    if (sortDirection === 'desc') {
      sortBy += '!';
    }
    sortBy += sortType;
    options.sortBy = [sortBy];
    options.page = 1;
    dispatch(listProducts(options));
  };

  const onKeyphraseChange = ({ keyphrase }: SearchResultsKeyphraseChangedActionPayload) => {
    const options = buildExistingOptions();
    options.search = keyphrase;
    options.page = 1;
    dispatch(listProducts(options));
  };

  useEffect(() => {
    // set rfkid
    const path = router.pathname;
    setRfkid(path.includes('/category/') ? 'rfkid_10' : '');

    // search with new query
    const query = router.query.q as string;
    onKeyphraseChange({ keyphrase: query, rfkId: rfkid });

    // ignoring adding onKeyphraseChange to dependency because we don't care if it or any of its dependencies
    // change, we only want to rerun this function if query changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q]);

  return (
    <FullPageSearch
      rfkId={rfkid}
      {...productListState}
      onFacetClick={onFacetClick}
      onClearFilters={onClearFilters}
      onPageNumberChange={onPageNumberChange}
      onSortChange={onSortChange}
      onKeyphraseChange={onKeyphraseChange}
    />
  );
};

export default OrderCloudFullPageSearch;
