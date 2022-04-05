import { AccessToken, Auth, RequiredDeep, Tokens } from 'ordercloud-javascript-sdk';
import { retrieveCart, transferAnonOrder } from '../ocCurrentCart';
import { clearProductList } from '../ocProductList';
import { cleanProductCache } from '../ocProductCache';
import { createOcAsyncThunk } from '../ocReduxHelpers';
import { clearUser, getUser } from '../ocUser';
import { Configuration } from 'ordercloud-javascript-sdk';
import { orderCloudScope } from '../../constants/ordercloud-scope';

export interface LoginActionRequest {
  username: string;
  password: string;
  remember?: boolean;
}

const login = createOcAsyncThunk<RequiredDeep<AccessToken>, LoginActionRequest>(
  'ocAuth/login',
  async (credentials, thunkAPI) => {
    const ocConfig = Configuration.Get();
    if (!ocConfig?.clientID || !ocConfig?.baseApiUrl) {
      throw new Error('Ordercloud Javascript SDK not configured correctly');
    }
    const { ocCurrentCart } = thunkAPI.getState();

    // set the transfer token if the anonymous user has an in progress order
    let transferToken;
    if (ocCurrentCart && ocCurrentCart.order) {
      transferToken = Tokens.GetAccessToken();
    }

    thunkAPI.dispatch(clearUser());
    thunkAPI.dispatch(clearProductList());
    thunkAPI.dispatch(cleanProductCache());

    const response = await Auth.Login(
      credentials.username,
      credentials.password,
      ocConfig.clientID,
      orderCloudScope
    );

    Tokens.SetAccessToken(response.access_token);
    if (credentials.remember && response.refresh_token) {
      Tokens.SetRefreshToken(response.refresh_token);
    }

    thunkAPI.dispatch(getUser());

    // transfer the order if a transfer token was set
    if (transferToken) {
      thunkAPI.dispatch(transferAnonOrder(transferToken));
    } else {
      thunkAPI.dispatch(retrieveCart());
    }
    return response;
  }
);

export default login;
