import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Me, RequiredDeep } from 'ordercloud-javascript-sdk';
import { createOcAsyncThunk } from '../ocReduxHelpers';
import { OcProductListOptions } from '../ocProductList';
import { RootState } from '../store';
import { DBuyerProduct } from 'src/models/ordercloud/DBuyerProduct';

export const ocProductsAdapter = createEntityAdapter<RequiredDeep<DBuyerProduct>>({
  selectId: (p) => p.ID,
});

export const ocProductCacheSelectors = ocProductsAdapter.getSelectors<RootState>(
  (s) => s.ocProductCache
);

export const listProducts = createOcAsyncThunk<RequiredDeep<DBuyerProduct>[], OcProductListOptions>(
  'ocProducts/list',
  async (options) => {
    const response = await Me.ListProducts<DBuyerProduct>(options);
    return response.Items;
  }
);

export const getProduct = createOcAsyncThunk<RequiredDeep<DBuyerProduct>, string>(
  'ocProducts/get',
  async (productId) => {
    const response = await Me.GetProduct<DBuyerProduct>(productId);
    return response;
  }
);

const ocProductCacheSlice = createSlice({
  name: 'ocProducts',
  initialState: ocProductsAdapter.getInitialState(),
  reducers: {
    cleanProductCache: (state) => {
      ocProductsAdapter.removeAll(state);
    },
    cacheProducts: (state, action: PayloadAction<RequiredDeep<DBuyerProduct>[]>) => {
      ocProductsAdapter.upsertMany(state, action);
    },
    cacheProduct: (state, action: PayloadAction<RequiredDeep<DBuyerProduct>>) => {
      ocProductsAdapter.upsertOne(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listProducts.fulfilled, ocProductsAdapter.upsertMany);
    builder.addCase(getProduct.fulfilled, ocProductsAdapter.upsertOne);
  },
});

export const { cacheProducts, cacheProduct, cleanProductCache } = ocProductCacheSlice.actions;

export default ocProductCacheSlice.reducer;
