import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { SortOrder } from '@sitecore-discover/react';
import { Category, Filters, ListPageWithFacets, Me } from 'ordercloud-javascript-sdk';
import {
  mapOrderCloudCategoryToCategoriesDataCategory,
  mapOrderCloudProductToDiscoverProduct,
  mapOrderderCloudFacetToDiscoverFacet,
} from '../../helpers/OrderCloudHelper';
import { CategoriesDataCategory } from '../../models/Category';
import { Facet, SortChoice } from '../../models/discover/Facet';
import { Product } from '../../models/discover/Product';
import { DBuyerProduct } from '../../models/ordercloud/DBuyerProduct';
import { cacheProducts } from '../ocProductCache';
import { createOcAsyncThunk, OcThrottle } from '../ocReduxHelpers';

export interface OcProductListOptions {
  catalogID?: string;
  categoryID?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  depth?: string;
  searchOn?: string[];
  sortBy?: string[];
  filters?: Filters;
}

export interface OcProductListState {
  catalogId?: string;
  error?: SerializedError;
  loaded?: boolean;
  loading?: boolean;
  page?: number;
  keyphrase?: string;
  totalPages?: number;
  totalItems?: number;
  sortType?: string;
  sortDirection?: SortOrder;
  sortChoices?: SortChoice[];
  products?: Product[];
  category?: CategoriesDataCategory;
  facets?: Facet[];
}

const initialState: OcProductListState = {
  error: null,
  loaded: false,
  loading: false,
  sortChoices: [
    {
      order: 'asc',
      name: 'Name',
      label: 'Name: A-Z',
    },
    {
      order: 'desc',
      name: 'Name',
      label: 'Name: Z-A',
    },
    {
      order: 'asc',
      name: 'xp.Price',
      label: 'Price: Low to High',
    },
    {
      order: 'desc',
      name: 'xp.Price',
      label: 'Price: High to Low',
    },
    // not sure what the feature sorting is on discover, but we could enable it by adding it to xp in the same way we did for price
  ],
};

interface SetListOptionsResult {
  response: ListPageWithFacets<DBuyerProduct>;
  options: OcProductListOptions;
  category?: Category;
}

const productListThrottle: OcThrottle = {
  location: 'ocProductList',
  property: 'loading',
};

export const listProducts = createOcAsyncThunk<SetListOptionsResult, OcProductListOptions>(
  'ocProductList/listProducts',
  async (options, ThunkAPI) => {
    let category: Category;
    if (options.categoryID) {
      let catalogID = ThunkAPI.getState().ocProductList.catalogId;
      if (!catalogID) {
        catalogID = await ThunkAPI.dispatch(setDefaultCatalog()).unwrap();
      }
      options.catalogID = catalogID;
      category = await Me.GetCategory(options.categoryID, { catalogID });
    }
    const response = await Me.ListProducts<DBuyerProduct>(options);
    ThunkAPI.dispatch(cacheProducts(response.Items));
    return {
      response,
      options,
      category,
    };
  },
  productListThrottle
);

export const setDefaultCatalog = createOcAsyncThunk<string>(
  'ocProductList/setDefaultCatalog',
  async () => {
    const myCatalogs = await Me.ListCatalogs();
    return myCatalogs.Items[0].ID;
  }
);

const ocProductListSlice = createSlice({
  name: 'ocProductList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listProducts.pending, (state) => {
      state.loading = true;
      state.loaded = false;
      state.error = undefined;
    });
    builder.addCase(listProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.page = action.payload.response.Meta.Page;
      state.keyphrase = action.payload.options.search;
      state.totalPages = action.payload.response.Meta.TotalPages;
      state.totalItems = action.payload.response.Meta.TotalCount;
      state.products = action.payload.response.Items.map(mapOrderCloudProductToDiscoverProduct);
      state.category = action.payload.category
        ? mapOrderCloudCategoryToCategoriesDataCategory(action.payload.category)
        : null;
      const facets = action.payload.response.Meta.Facets.map((facet) => {
        return mapOrderderCloudFacetToDiscoverFacet(facet, action.payload.options.filters);
      });
      state.facets = facets;
      if (action.payload.options.sortBy?.length) {
        const sortBy = action.payload.options.sortBy[0];
        state.sortDirection = sortBy.includes('!') ? 'desc' : 'asc';
        state.sortType = sortBy.replace('!', '');
      } else {
        state.sortType = null;
        state.sortDirection = null;
      }
    });
    builder.addCase(listProducts.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(setDefaultCatalog.fulfilled, (state, action) => {
      state.catalogId = action.payload;
    });
  },
});

export default ocProductListSlice.reducer;
