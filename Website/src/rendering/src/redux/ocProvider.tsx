import React, { FunctionComponent, useEffect } from 'react';
import { initializeAuth } from './ocAuth';
import logout from './ocAuth/logout';
import { retrieveCart } from './ocCurrentCart';
import { useAppDispatch, useAppSelector } from './store';
import { getUser } from './ocUser';
import { Configuration, Tokens } from 'ordercloud-javascript-sdk';
import { isCommerceEnabled } from '../helpers/CommerceHelper';
import { useRouter } from 'next/router';
import { Actions, PageController } from '@sitecore-discover/react';
import { DMeUser } from '../../src/models/ordercloud/DUser';

Configuration.Set({
  baseApiUrl: process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL,
  clientID: process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID,
});

const OcProvider: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const token = getTokenFromPath(router.asPath);
  if (token) {
    Tokens.SetAccessToken(token);
    delete router.query.oidcToken;
    router.push(router);
  }
  const dispatch = useAppDispatch();
  const { ocAuth, ocUser, ocCurrentCart } = useAppSelector((s) => ({
    ocAuth: s.ocAuth,
    ocUser: s.ocUser,
    ocCurrentCart: s.ocCurrentCart,
  }));

  useEffect(() => {
    if (isCommerceEnabled) {
      if (!ocAuth.initialized) {
        dispatch(initializeAuth());
        dispatchDiscoverUserLoginEvent(ocUser.user);
      } else if (ocAuth.isAnonymous && !ocAuth.isAuthenticated) {
        dispatch(logout());
      } else if (ocAuth.isAuthenticated) {
        if (!ocUser.user && !ocUser.loading) {
          dispatch(getUser());
        }
        if (!ocCurrentCart.initialized) {
          dispatch(retrieveCart());
        }
      }
    }
  }, [dispatch, ocAuth, ocUser, ocCurrentCart]);

  return <>{children}</>;
};

const dispatchDiscoverUserLoginEvent = (user: DMeUser) => {
  PageController.getDispatcher().dispatch({
    type: Actions.USER_LOGIN,
    payload: {
      email: user.Email,
      id: user.ID,
    },
  });
};

function getTokenFromPath(path?: string): string {
  // router has a query parameter but it isn't accessible on
  // first page load which is too late for our use case
  if (!path) {
    return null;
  }
  if (!path.includes('?')) {
    return null;
  }
  const queryString = path.split('?')[1];
  const query = new URLSearchParams(queryString);
  return query.get('oidcToken');
}

export default OcProvider;
