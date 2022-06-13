import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { Me, PartialDeep, RequiredDeep } from 'ordercloud-javascript-sdk';
import { DMeUser } from 'src/models/ordercloud/DUser';
import { createOcAsyncThunk, OcThrottle } from '../ocReduxHelpers';

export interface ocUserState {
  user?: DMeUser;
  loading: boolean;
  error?: SerializedError;
}

const initialState: ocUserState = {
  loading: false,
};

const userThrottle: OcThrottle = {
  location: 'ocUser',
  property: 'loading',
};

export const getUser = createOcAsyncThunk<RequiredDeep<DMeUser>, undefined>(
  'ocUser/get',
  async () => {
    return Me.Get<DMeUser>();
  },
  userThrottle
);

export const updateUser = createOcAsyncThunk<RequiredDeep<DMeUser>, PartialDeep<DMeUser>>(
  'ocUser/update',
  async (data) => {
    return Me.Patch<DMeUser>(data);
  }
);

const ocUserSlice = createSlice({
  name: 'ocUser',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = undefined;
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export const { clearUser } = ocUserSlice.actions;

export default ocUserSlice.reducer;
