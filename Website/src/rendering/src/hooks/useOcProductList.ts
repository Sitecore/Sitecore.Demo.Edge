import { BuyerProduct } from 'ordercloud-javascript-sdk';
import { useEffect } from 'react';
import { isEqual } from 'lodash';
import { OcProductListOptions, setListOptions } from '../redux/ocProductList';
import { useAppDispatch, useAppSelector } from '../redux/store';

const useOcProductList = (listOptions: OcProductListOptions): BuyerProduct[] => {
  const dispatch = useAppDispatch();

  const { products, options, isAuthenticated } = useAppSelector((s) => ({
    isAuthenticated: s.ocAuth.isAuthenticated,
    products: s.ocProductList.items,
    options: s.ocProductList.options,
  }));

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let promise: any;
    if (isAuthenticated && (!options || (options && !isEqual(listOptions, options)))) {
      promise = dispatch(setListOptions(listOptions));
    }
    return () => promise && promise.abort();
  }, [dispatch, options, listOptions, isAuthenticated]);

  return products;
};

export default useOcProductList;
