import { Actions, PageController } from '@sitecore-discover/react';
import { DLineItem } from '../../models/ordercloud/DLineItem';
import mapProductsForDiscover from './ProductMapper';

export const dispatchDiscoverCartStatusListActionEvent = (lineItems: DLineItem[]): void => {
  PageController.getDispatcher().dispatch({
    type: Actions.CART_STATUS,
    payload: {
      products: mapProductsForDiscover(lineItems),
    },
  });
};
