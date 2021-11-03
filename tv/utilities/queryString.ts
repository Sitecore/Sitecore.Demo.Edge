import qs from 'query-string';

const setQueryStringWithoutPageReload = (qsValue: string) => {
  const newurl =
    window.location.protocol + '//' + window.location.host + window.location.pathname + qsValue;
  window.history.pushState({ path: newurl }, '', newurl);
};

export const getQueryStringValue = (key: string, queryString: string = window.location.search) => {
  const values = qs.parse(queryString);
  return values[key];
};

export const setQueryStringValue = (
  key: string,
  value: string,
  queryString = window.location.search
) => {
  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({
    ...values,
    [key]: value,
  });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};
