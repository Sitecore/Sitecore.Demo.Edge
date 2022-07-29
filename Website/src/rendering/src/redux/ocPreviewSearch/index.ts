import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Me, RequiredDeep } from 'ordercloud-javascript-sdk';
import { createOcAsyncThunk } from '../ocReduxHelpers';
import { DBuyerProduct } from 'src/models/ordercloud/DBuyerProduct';
import {
  mapOrderCloudCategoryToDiscoverCategory,
  mapOrderCloudProductToDiscoverProduct,
} from '../../helpers/OrderCloudHelper';
import { cacheProducts } from '../ocProductCache';
import { DCategory } from '../../models/ordercloud/DCategory';

export interface OcPreviewSearchState {
  loaded: boolean;
  loading: boolean;
  products: unknown[];
  keyphrase: string;
  trendingCategories: unknown[];
  categories: unknown[];
  suggestions: unknown[];
}

export const keyphraseChanged = createOcAsyncThunk<
  { categories: RequiredDeep<DCategory>[]; products: RequiredDeep<DBuyerProduct>[] },
  string
>('ocPreviewSearch/keyphraseChanged', async (keyphrase: string) => {
  const productListRequest = Me.ListProducts<DBuyerProduct>({
    pageSize: 10,
    search: keyphrase,
  });
  const categoryListRequest = Me.ListCategories<DCategory>({
    pageSize: 10,
    search: keyphrase,
    depth: 'all',
  });
  const [productList, categoryList] = await Promise.all([productListRequest, categoryListRequest]);
  const products = productList.Items;
  cacheProducts(products);
  const categories = categoryList.Items;
  return {
    categories,
    products,
  };
});

export const categoryChanged = createOcAsyncThunk<
  { categories: RequiredDeep<DCategory>[]; products: RequiredDeep<DBuyerProduct>[] },
  string
>('ocPreviewSearch/categoryChanged', async (categoryID: string) => {
  const productListRequest = Me.ListProducts<DBuyerProduct>({
    pageSize: 10,
    categoryID: categoryID,
    depth: 'all',
  });
  const categoryListRequest = Me.ListCategories<DCategory>({
    pageSize: 10,
    search: categoryID,
    depth: 'all',
  });
  const [productList, categoryList] = await Promise.all([productListRequest, categoryListRequest]);
  const products = productList.Items;
  cacheProducts(products);
  const categories = categoryList.Items;
  return {
    categories,
    products,
  };
});

const isLoading = isAnyOf(keyphraseChanged.pending, categoryChanged.pending);
const isNotLoading = isAnyOf(keyphraseChanged.fulfilled, categoryChanged.fulfilled);

const ocPreviewSearchSlice = createSlice({
  name: 'ocPreviewSearch',
  initialState: {
    loaded: false,
    loading: false,
    products: [],
    keyphrase: '',
    trendingCategories: [],
    categories: [],
    suggestions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(keyphraseChanged.fulfilled, (state, action) => {
      state.products = action.payload.products.map(mapOrderCloudProductToDiscoverProduct);
      state.categories = action.payload.categories.map(mapOrderCloudCategoryToDiscoverCategory);
    });
    builder.addCase(categoryChanged.fulfilled, (state, action) => {
      state.products = action.payload.products.map(mapOrderCloudProductToDiscoverProduct);
      state.categories = action.payload.categories.map(mapOrderCloudCategoryToDiscoverCategory);
    });
    builder.addMatcher(isLoading, (state) => {
      state.loading = true;
      state.loaded = false;
    });
    builder.addMatcher(isNotLoading, (state) => {
      state.loading = false;
      state.loaded = true;
    });
  },
});

export default ocPreviewSearchSlice.reducer;
