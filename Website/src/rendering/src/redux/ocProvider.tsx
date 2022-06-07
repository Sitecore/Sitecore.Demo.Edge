import React, { FunctionComponent, useEffect, useState } from 'react';
import { initializeAuth } from './ocAuth';
import logout from './ocAuth/logout';
import { retrieveCart } from './ocCurrentCart';
import { useAppDispatch, useAppSelector } from './store';
import { getUser } from './ocUser';
import { Configuration, Tokens } from 'ordercloud-javascript-sdk';
import { isCommerceEnabled } from '../helpers/CommerceHelper';
import { useRouter } from 'next/router';
import { Actions, PageController } from '@sitecore-discover/react';

// TODO: Look into decoupling OrderCloud, Auth0, and Discover logic to keep this file for OrderCloud code only

Configuration.Set({
  baseApiUrl: process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL,
  clientID: process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID,
});

const OcProvider: FunctionComponent = ({ children }) => {
  const [hasCheckedForToken, setHasCheckedForToken] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const token = router.query.oidcToken as string;
    if (token) {
      Tokens.SetAccessToken(token);

      // Remove the query string arguments from the URL without reloading the page
      delete router.query.oidcToken;
      delete router.query.idpToken;
      router.replace(
        {
          pathname: router.pathname,
          query: router.query,
        },
        undefined,
        { shallow: true }
      );
      const dispatchDiscoverUserLoginEvent = async () => {
        const user = await dispatch(getUser()).unwrap();
        PageController.getDispatcher().dispatch({
          type: Actions.USER_LOGIN,
          payload: {
            email: user.Email,
            id: user.ID,
          },
        });
      };
      dispatchDiscoverUserLoginEvent();
    }
    setHasCheckedForToken(true);
  }, [dispatch, router]);

  const { ocAuth, ocUser, ocCurrentCart } = useAppSelector((s) => ({
    ocAuth: s.ocAuth,
    ocUser: s.ocUser,
    ocCurrentCart: s.ocCurrentCart,
  }));

  useEffect(() => {
    if (isCommerceEnabled && hasCheckedForToken) {
      if (!ocAuth.initialized) {
        dispatch(initializeAuth());
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
  }, [dispatch, ocAuth, ocUser, ocCurrentCart, hasCheckedForToken]);

  return <>{children}</>;
};

export default OcProvider;
