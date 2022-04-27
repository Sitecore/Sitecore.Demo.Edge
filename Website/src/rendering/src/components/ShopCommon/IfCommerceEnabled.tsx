import React from 'react';
import { Provider } from 'react-redux';
import reduxStore from '../../redux/store';
import OcProvider from '../../redux/ocProvider';
import { isCommerceEnabled } from '../../helpers/CommerceHelper';

type ifCommerceEnabledProps = {
  children: JSX.Element;
};

const IfCommerceEnabled = ({ children }: ifCommerceEnabledProps): JSX.Element =>
  isCommerceEnabled ? (
    <Provider store={reduxStore}>
      <OcProvider>{children}</OcProvider>
    </Provider>
  ) : (
    <></>
  );

export default IfCommerceEnabled;
