import React, { FunctionComponent, useEffect } from 'react';
import { initializeAuth } from './ocAuth';
import logout from './ocAuth/logout';
import { retrieveCart } from './ocCurrentCart';
import { useAppDispatch, useAppSelector } from './store';
import { getUser } from './ocUser';
import { Configuration } from 'ordercloud-javascript-sdk';
import { isCommerceEnabled } from '../helpers/CommerceHelper';

Configuration.Set({
  baseApiUrl: process.env.NEXT_PUBLIC_ORDERCLOUD_BASE_API_URL,
  clientID: process.env.NEXT_PUBLIC_ORDERCLOUD_BUYER_CLIENT_ID,
});

const OcProvider: FunctionComponent = ({ children }) => {
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

export default OcProvider;
