import { AccessToken, Auth, Configuration, Tokens } from 'ordercloud-javascript-sdk';
import { clearProductList } from '../ocProductList';
import { createOcAsyncThunk, OcThrottle } from '../ocReduxHelpers';
import { clearUser, getUser } from '../ocUser';
import { clearCurrentOrder } from '../ocCurrentCart';
import { cleanProductCache } from '../ocProductCache';
import { orderCloudScope } from '../../constants/ordercloud-scope';

const logoutThrottle: OcThrottle = {
  location: 'ocAuth',
  property: 'loading',
};

const logout = createOcAsyncThunk<AccessToken | undefined>(
  'ocAuth/logout',
  async (_, thunkAPI) => {
    const ocConfig = Configuration.Get();
    if (!ocConfig?.clientID || !ocConfig?.baseApiUrl) {
      throw new Error('Ordercloud Javascript SDK not configured correctly');
    }

    thunkAPI.dispatch(clearUser());
    thunkAPI.dispatch(clearProductList());
    thunkAPI.dispatch(cleanProductCache());
    thunkAPI.dispatch(clearCurrentOrder());

    Tokens.RemoveAccessToken();
    Tokens.RemoveRefreshToken();

    const response = await Auth.Anonymous(ocConfig.clientID, orderCloudScope);
    Tokens.SetAccessToken(response.access_token);
    Tokens.SetRefreshToken(response.refresh_token);
    thunkAPI.dispatch(getUser());
    return response;
  },
  logoutThrottle
);

export default logout;
