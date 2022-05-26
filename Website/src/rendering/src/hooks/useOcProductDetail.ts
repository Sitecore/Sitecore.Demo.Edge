import { BuyerProduct, RequiredDeep, Spec, Variant } from 'ordercloud-javascript-sdk';
import { useEffect, useMemo } from 'react';
import { setProductId } from '../redux/ocProductDetail';
import { useAppDispatch, useAppSelector } from '../redux/store';

const useOcProductDetail = (
  productId: string
): {
  loading?: boolean;
  product?: RequiredDeep<BuyerProduct>;
  specs?: RequiredDeep<Spec>[];
  variants?: RequiredDeep<Variant>[];
} => {
  const dispatch = useAppDispatch();

  const { product, loading, specs, variants, isAuthenticated } = useAppSelector((s) => ({
    product: s.ocProductDetail.product,
    loading: s.ocProductDetail.loading,
    specs: s.ocProductDetail.specs,
    variants: s.ocProductDetail.variants,
    isAuthenticated: s.ocAuth.isAuthenticated,
  }));

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let promise: any;
    if (productId && isAuthenticated) {
      promise = dispatch(setProductId(productId));
    }
    return () => promise && promise.abort();
  }, [dispatch, productId, isAuthenticated]);

  const result = useMemo(
    () => ({
      product,
      loading,
      specs,
      variants,
    }),
    [product, loading, specs, variants]
  );

  return result;
};

export default useOcProductDetail;
