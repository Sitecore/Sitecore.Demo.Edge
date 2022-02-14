import { useRouter } from 'next/router';
import { Filters } from 'ordercloud-javascript-sdk';
import { ParsedUrlQuery } from 'querystring';
import { useCallback, useMemo } from 'react';
import { OcProductListOptions } from '../redux/ocProductList';

export interface NextQueryMap {
  [key: string]: string;
}

const mapQueryParamsToFilters = (map: NextQueryMap, query: ParsedUrlQuery): Filters => {
  const result: Filters = {};
  Object.entries(map).forEach((entry) => {
    result[entry[0]] = query[entry[1] as string];
  });
  return result;
};

const mapQueryParamsToOptions = (
  map: NextQueryMap,
  query: ParsedUrlQuery
): OcProductListOptions => {
  const { search, page, pageSize, searchOn, sortBy, ...rest } = map;
  const searchOnValue = query[searchOn];
  const sortByValue = query[sortBy];
  return {
    search: query[search] ? String(query[search]) : undefined,
    page: query[page] ? Number(query[page]) : undefined,
    pageSize: query[pageSize] ? Number(query[pageSize]) : undefined,
    searchOn: typeof searchOnValue === 'string' ? [searchOnValue] : searchOnValue,
    sortBy: typeof sortByValue === 'string' ? [sortByValue] : sortByValue,
    filters: mapQueryParamsToFilters(rest, query),
  };
};

const mapOptionsToQueryParams = (
  map: NextQueryMap,
  options: OcProductListOptions
): ParsedUrlQuery => {
  const result: Record<string, string> = {};
  Object.entries(options).forEach((entry) => {
    if (entry[0] === 'filters' || entry[1] === undefined || entry[1] === '') return;
    result[map[entry[0]]] =
      typeof entry[1] === 'object' ? encodeURIComponent(entry[1].join(',')) : String(entry[1]);
  });
  const filterResults = options.filters ? mapOptionsToQueryParams(map, options.filters) : {};
  return { ...result, ...filterResults };
};

const useNextRouterMapping = (
  map: NextQueryMap
): {
  isReady: boolean;
  options: OcProductListOptions;
  updateQuery: (options: OcProductListOptions) => void;
} => {
  const { isReady, query, push, pathname } = useRouter();

  const options = useMemo(() => {
    const result = mapQueryParamsToOptions(map, query);
    return result;
  }, [query, map]);

  const updateQuery = useCallback(
    (o: OcProductListOptions) => {
      push({
        pathname,
        query: mapOptionsToQueryParams(map, o),
      }); // map options to query params
    },
    [push, pathname, map]
  );

  return {
    isReady,
    options,
    updateQuery,
  };
};

export default useNextRouterMapping;
