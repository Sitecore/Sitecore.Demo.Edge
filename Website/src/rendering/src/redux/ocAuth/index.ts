import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { DecodedToken, Tokens } from 'ordercloud-javascript-sdk';
import { parseOrderCloudJwt } from '../../helpers/OrderCloudJwtHelper';
import login from './login';
import logout from './logout';

export interface OcAuthState {
  isAuthenticated: boolean;
  decodedToken?: DecodedToken;
  isAnonymous: boolean;
  error?: SerializedError;
  loading: boolean;
  initialized: boolean;
}

const initialState: OcAuthState = {
  isAuthenticated: false,
  isAnonymous: true,
  loading: false,
  initialized: false,
};

const ocAuthSlice = createSlice({
  name: 'ocAuth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const initialAccessToken = Tokens.GetAccessToken();
      let isAnonymous = true;
      let decodedToken;

      if (initialAccessToken) {
        decodedToken = parseOrderCloudJwt(initialAccessToken);
        isAnonymous = !!decodedToken.orderid;
      }

      state.isAuthenticated = !!initialAccessToken;
      state.isAnonymous = isAnonymous;
      state.decodedToken = decodedToken;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    // LOGIN CASES
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAnonymous = false;
      state.isAuthenticated = true;
      state.decodedToken = parseOrderCloudJwt(action.payload.access_token);
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error;
      state.isAuthenticated = true;
      state.loading = false;
    });

    // LOGOUT CASES
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.decodedToken = undefined;
      state.isAuthenticated = false;
      state.isAnonymous = true;
      state.error = undefined;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAnonymous = true;
      state.isAuthenticated = true;
      state.decodedToken = action.payload
        ? parseOrderCloudJwt(action.payload.access_token)
        : undefined;
      state.loading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export const { initializeAuth } = ocAuthSlice.actions;

export default ocAuthSlice.reducer;
