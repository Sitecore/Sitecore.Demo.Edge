import { BuyerProduct, RequiredDeep } from 'ordercloud-javascript-sdk';
import { useEffect } from 'react';
import { getProduct, ocProductCacheSelectors } from '../redux/ocProductCache';
import { useAppDispatch, useAppSelector } from '../redux/store';

const useOcProduct = (productId: string): RequiredDeep<BuyerProduct> => {
  const dispatch = useAppDispatch();
  const { product, isAuthenticated } = useAppSelector((s) => ({
    isAuthenticated: s.ocAuth.isAuthenticated,
    product: ocProductCacheSelectors.selectById(s, productId),
  }));

  useEffect(() => {
    if (isAuthenticated && (!product || product.ID !== productId)) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, isAuthenticated, product, productId]);

  return product;
};

export default useOcProduct;
