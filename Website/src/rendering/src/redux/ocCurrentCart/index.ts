import { createSlice } from '@reduxjs/toolkit';
import {
  LineItems,
  Me,
  Orders,
  IntegrationEvents,
  RequiredDeep,
  ShipMethodSelection,
  Payments,
  PartialDeep,
} from 'ordercloud-javascript-sdk';
import { DAddress } from 'src/models/ordercloud/DAddress';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';
import { DLineItem } from 'src/models/ordercloud/DLineItem';
import { DOrder } from 'src/models/ordercloud/DOrder';
import { DOrderWorksheet } from 'src/models/ordercloud/DOrderWorksheet';
import { DPayment } from 'src/models/ordercloud/DPayment';
import { DOrderPromotion } from 'src/models/ordercloud/DOrderPromotion';
import { DShipEstimateResponse } from 'src/models/ordercloud/DShipEstimateResponse';
import { createOcAsyncThunk } from '../ocReduxHelpers';

export interface RecentOrder {
  order: RequiredDeep<DOrder>;
  lineItems: RequiredDeep<DLineItem>[];
  payments: RequiredDeep<DPayment>[];
}

export interface OcCurrentOrderState {
  initialized: boolean;
  order?: RequiredDeep<DOrder>;
  lineItems?: RequiredDeep<DLineItem>[];
  payments?: RequiredDeep<DPayment>[];
  shipEstimateResponse?: RequiredDeep<DShipEstimateResponse>;
  promotions?: RequiredDeep<DOrderPromotion>[];
  shippingAddress?: RequiredDeep<DAddress>;
}

const initialState: OcCurrentOrderState = {
  initialized: false,
};

export const removeAllPayments = createOcAsyncThunk<undefined, undefined>(
  'ocCurrentCart/removeAllPayments',
  async (_, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    const queue: Promise<void>[] = [];
    if (ocCurrentCart.payments) {
      ocCurrentCart.payments.forEach((p) => {
        queue.push(Payments.Delete('All', ocCurrentCart.order.ID, p.ID));
      });
    }
    await Promise.all(queue);
    return undefined;
  }
);

export const retrievePayments = createOcAsyncThunk<RequiredDeep<DPayment>[], string>(
  'ocCurrentCart/retrievePayments',
  async (orderId) => {
    const response = await Payments.List<DPayment>('All', orderId, { pageSize: 100 });
    return response.Items;
  }
);

export const retrievePromotions = createOcAsyncThunk<RequiredDeep<DOrderPromotion>[], string>(
  'ocCurrentCart/retrievePromotions',
  async (orderId) => {
    const response = await Orders.ListPromotions('All', orderId);
    return response.Items;
  }
);

export const removePromotion = createOcAsyncThunk<RequiredDeep<DOrderPromotion>, string>(
  'ocCurrentCart/removePromotion',
  async (promoCode, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    const orderId = ocCurrentCart.order.ID;
    return await Orders.RemovePromotion('All', orderId, promoCode);
  }
);

export const addPromotion = createOcAsyncThunk<RequiredDeep<DOrderPromotion>, string>(
  'ocCurrentCart/addPromotion',
  async (promoCode, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    const orderId = ocCurrentCart.order.ID;
    return await Orders.AddPromotion('All', orderId, promoCode);
  }
);

export const refreshPromotions = createOcAsyncThunk<RequiredDeep<DOrderPromotion>[], string>(
  'ocCurrentCart/refreshPromotions',
  async (orderID, ThunkAPI) => {
    // The ordercloud api does not re-evaluate promotion discounts after initially applied
    // so if changes to line items are made we need to manually remove and re-add promotions so that they are applied
    const { ocCurrentCart } = ThunkAPI.getState();
    const promotions = ocCurrentCart.promotions;

    // delete all promos on order
    const removePromos = promotions.map((p) => Orders.RemovePromotion('All', orderID, p.Code));
    await Promise.all(removePromos);

    // add all promos back
    const addPromos = promotions.map((p) => Orders.AddPromotion('All', orderID, p.Code));
    return await Promise.all(addPromos);
  }
);

export const retrieveCart = createOcAsyncThunk<RequiredDeep<DOrderWorksheet> | undefined, void>(
  'ocCurrentCart/retrieveCart',
  async (_, ThunkAPI) => {
    const response = await Me.ListOrders<DOrder>({
      sortBy: ['DateCreated'],
      filters: { Status: 'Unsubmitted' },
    });
    const firstOrder = response.Items[0];
    if (firstOrder) {
      const worksheet = await IntegrationEvents.GetWorksheet<DOrderWorksheet>('All', firstOrder.ID);
      if (
        worksheet.Order.BillingAddress &&
        worksheet.ShipEstimateResponse &&
        worksheet.ShipEstimateResponse.ShipEstimates &&
        worksheet.ShipEstimateResponse.ShipEstimates.length &&
        worksheet.ShipEstimateResponse.ShipEstimates.filter((se) => !se.SelectedShipMethodID)
          .length === 0
      ) {
        ThunkAPI.dispatch(retrievePayments(firstOrder.ID));
      }
      ThunkAPI.dispatch(retrievePromotions(firstOrder.ID));
      return worksheet;
    }
    return undefined;
  }
);

export const patchOrder = createOcAsyncThunk<RequiredDeep<DOrder>, PartialDeep<DOrder>>(
  'ocCurrentCart/patch',
  async (partialOrder, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    const orderID = ocCurrentCart.order.ID;

    return await Orders.Patch('All', orderID, partialOrder);
  }
);

export const deleteCurrentOrder = createOcAsyncThunk<void, void>(
  'ocCurrentCart/delete',
  async (_, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    if (ocCurrentCart.order) {
      await Orders.Delete('All', ocCurrentCart.order.ID);
    }
    // eslint-disable-next-line no-use-before-define
    ThunkAPI.dispatch(clearCurrentOrder());
    ThunkAPI.dispatch(retrieveCart());
  }
);

export const transferAnonOrder = createOcAsyncThunk<void, string>(
  'ocCurrentCart/transfer',
  async (anonUserToken, ThunkAPI) => {
    await Me.TransferAnonUserOrder({ anonUserToken });
    ThunkAPI.dispatch(retrieveCart());
  }
);

export const createLineItem = createOcAsyncThunk<RequiredDeep<DOrderWorksheet>, DLineItem>(
  'ocCurrentCart/createLineItem',
  async (request, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    let orderId = ocCurrentCart.order ? ocCurrentCart.order.ID : undefined;

    // initialize the order if it doesn't exist already
    if (!orderId) {
      const orderResponse = await Orders.Create<DOrder>('All', {});
      orderId = orderResponse.ID;
    }
    await LineItems.Create<DLineItem>('All', orderId, request);
    if (ocCurrentCart.promotions?.length) {
      ThunkAPI.dispatch(refreshPromotions(orderId));
    }

    return IntegrationEvents.GetWorksheet<DOrderWorksheet>('All', orderId);
  }
);

export const updateLineItem = createOcAsyncThunk<RequiredDeep<DOrderWorksheet>, DLineItem>(
  'ocCurrentCart/updateLineItem',
  async (request, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    const orderId = ocCurrentCart.order.ID;

    await LineItems.Save<DLineItem>('All', orderId, request.ID, request);
    if (ocCurrentCart.promotions?.length) {
      ThunkAPI.dispatch(refreshPromotions(orderId));
    }

    return IntegrationEvents.GetWorksheet<DOrderWorksheet>('All', orderId);
  }
);

export const patchLineItem = createOcAsyncThunk<
  RequiredDeep<DOrderWorksheet>,
  { lineItemID: string; partialLineItem: PartialDeep<DLineItem> }
>('ocCurrentCart/patchLineItem', async (request, ThunkAPI) => {
  const { ocCurrentCart } = ThunkAPI.getState();
  const orderId = ocCurrentCart.order.ID;

  await LineItems.Patch<DLineItem>('All', orderId, request.lineItemID, request.partialLineItem);
  if (ocCurrentCart.promotions?.length) {
    ThunkAPI.dispatch(refreshPromotions(orderId));
  }

  return IntegrationEvents.GetWorksheet<DOrderWorksheet>('All', orderId);
});

export const removeLineItem = createOcAsyncThunk<RequiredDeep<DOrderWorksheet>, string>(
  'ocCurrentCart/removeLineItem',
  async (request, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    const orderId = ocCurrentCart.order.ID;
    await LineItems.Delete('All', orderId, request);
    if (ocCurrentCart.promotions?.length) {
      ThunkAPI.dispatch(refreshPromotions(orderId));
    }
    return IntegrationEvents.GetWorksheet<DOrderWorksheet>('All', orderId);
  }
);

export const saveShippingAddress = createOcAsyncThunk<
  RequiredDeep<DOrderWorksheet>,
  Partial<DBuyerAddress>
>('ocCurrentCart/saveShippingAddress', async (request, ThunkAPI) => {
  const { ocCurrentCart } = ThunkAPI.getState();
  const orderId = ocCurrentCart.order ? ocCurrentCart.order.ID : undefined;
  if (!orderId) {
    throw new Error('No order ID');
  }

  if (request) {
    if (request.ID) {
      await Orders.Patch<DOrder>('All', orderId, { ShippingAddressID: request.ID });
    } else {
      await Orders.SetShippingAddress<DOrder>('All', orderId, request as DAddress);
    }
  } else {
    await Orders.Patch<DOrder>('All', orderId, { ShippingAddressID: null });
  }

  return IntegrationEvents.GetWorksheet<DOrderWorksheet>('All', orderId);
});

export const saveBillingAddress = createOcAsyncThunk<
  RequiredDeep<DOrderWorksheet>,
  Partial<DBuyerAddress>
>('ocCurrentCart/saveBillingAddress', async (request, ThunkAPI) => {
  const { ocCurrentCart } = ThunkAPI.getState();
  const orderId = ocCurrentCart.order ? ocCurrentCart.order.ID : undefined;

  if (!orderId) {
    throw new Error('No order ID');
  }
  if (request.ID) {
    await Orders.Patch<DOrder>('All', orderId, { BillingAddressID: request.ID });
  } else {
    await Orders.SetBillingAddress<DOrder>('All', orderId, request as DAddress);
  }
  ThunkAPI.dispatch(removeAllPayments());

  return IntegrationEvents.Calculate<DOrderWorksheet>('All', orderId);
});

export const removeBillingAddress = createOcAsyncThunk<RequiredDeep<DOrderWorksheet>, undefined>(
  'ocCurrentCart/removeBillingAddress',
  async (_, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    const { order } = ocCurrentCart;

    if (!order?.ID) {
      throw new Error('No order ID');
    }

    await Orders.Patch<DOrder>('All', order.ID, { BillingAddressID: null });
    ThunkAPI.dispatch(removeAllPayments());

    return IntegrationEvents.Calculate<DOrderWorksheet>('All', order.ID);
  }
);

export const estimateShipping = createOcAsyncThunk<RequiredDeep<DOrderWorksheet>, string>(
  'ocCurrentCart/estimateShipping',
  async (orderId) => {
    const response = await IntegrationEvents.EstimateShipping<DOrderWorksheet>('All', orderId);
    return response;
  }
);

export const selectShipMethods = createOcAsyncThunk<
  RequiredDeep<DOrderWorksheet>,
  RequiredDeep<ShipMethodSelection>[]
>('ocCurrentCart/selectShipMethods', async (selection, ThunkAPI) => {
  const { ocCurrentCart } = ThunkAPI.getState();
  const response = await IntegrationEvents.SelectShipmethods<DOrderWorksheet>(
    'All',
    ocCurrentCart.order.ID,
    {
      ShipMethodSelections: selection,
    }
  );
  ThunkAPI.dispatch(removeAllPayments());
  if (ocCurrentCart.order.BillingAddress) {
    return IntegrationEvents.Calculate<DOrderWorksheet>('All', ocCurrentCart.order.ID);
  }
  return response;
});

export const addPayment = createOcAsyncThunk<RequiredDeep<DPayment>, DPayment>(
  'ocCurrentCart/addPayment',
  async (payment, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    return Payments.Create<DPayment>('All', ocCurrentCart.order.ID, payment);
  }
);

export const removePayment = createOcAsyncThunk<string, string>(
  'ocCurrentCart/removePayment',
  async (paymentId, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    await Payments.Delete('All', ocCurrentCart.order.ID, paymentId);
    return paymentId;
  }
);

export const submitOrder = createOcAsyncThunk<RecentOrder, (orderID: string) => void>(
  'ocCurrentCart/submit',
  async (_, ThunkAPI) => {
    const { ocCurrentCart } = ThunkAPI.getState();
    const submitResponse = await Orders.Submit<DOrder>('All', ocCurrentCart.order.ID);
    // eslint-disable-next-line no-use-before-define
    ThunkAPI.dispatch(clearCurrentOrder());
    return {
      order: submitResponse,
      lineItems: ocCurrentCart.lineItems,
      payments: ocCurrentCart.payments,
    };
  }
);

const ocCurrentCartSlice = createSlice({
  name: 'ocCurrentCart',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.order = undefined;
      state.lineItems = undefined;
      state.shipEstimateResponse = undefined;
      state.payments = undefined;
      state.initialized = false;
      state.promotions = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveCart.pending, (state) => {
      state.initialized = true;
    });
    builder.addCase(retrieveCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.order = action.payload.Order;
        state.lineItems = action.payload.LineItems;
        state.shippingAddress = state.lineItems?.length ? state.lineItems[0].ShippingAddress : null;
        state.shipEstimateResponse = action.payload.ShipEstimateResponse;
      }
    });
    builder.addCase(patchOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.order = action.payload;
      }
    });
    builder.addCase(retrievePromotions.fulfilled, (state, action) => {
      if (action.payload) {
        state.promotions = action.payload;
      }
    });
    builder.addCase(removePromotion.fulfilled, (state, action) => {
      if (action.payload) {
        state.promotions = state.promotions.filter((p) => p.ID === action.payload.ID);
      }
    });
    builder.addCase(addPromotion.fulfilled, (state, action) => {
      if (action.payload) {
        state.promotions = [...state.promotions, action.payload];
      }
    });
    builder.addCase(refreshPromotions.fulfilled, (state, action) => {
      if (action.payload) {
        state.promotions = action.payload;
      }
    });
    builder.addCase(createLineItem.fulfilled, (state, action) => {
      state.order = action.payload.Order;
      state.lineItems = action.payload.LineItems;
      state.shipEstimateResponse = action.payload.ShipEstimateResponse;
    });
    builder.addCase(updateLineItem.fulfilled, (state, action) => {
      state.order = action.payload.Order;
      state.lineItems = action.payload.LineItems;
      state.shipEstimateResponse = action.payload.ShipEstimateResponse;
    });
    builder.addCase(patchLineItem.fulfilled, (state, action) => {
      state.order = action.payload.Order;
      state.lineItems = action.payload.LineItems;
      state.shipEstimateResponse = action.payload.ShipEstimateResponse;
    });
    builder.addCase(removeLineItem.fulfilled, (state, action) => {
      state.order = action.payload.Order;
      state.lineItems = action.payload.LineItems;
      state.shipEstimateResponse = action.payload.ShipEstimateResponse;
    });
    builder.addCase(saveShippingAddress.fulfilled, (state, action) => {
      state.order = action.payload.Order;
      state.lineItems = action.payload.LineItems;
      state.shippingAddress = action.payload.LineItems?.length
        ? action.payload.LineItems[0].ShippingAddress
        : null;
      state.shipEstimateResponse = action.payload.ShipEstimateResponse;
    });
    builder.addCase(saveBillingAddress.fulfilled, (state, action) => {
      state.order = action.payload.Order;
      state.lineItems = action.payload.LineItems;
      state.shipEstimateResponse = action.payload.ShipEstimateResponse;
    });
    builder.addCase(removeBillingAddress.fulfilled, (state, action) => {
      state.order = action.payload.Order;
      state.lineItems = action.payload.LineItems;
      state.shipEstimateResponse = action.payload.ShipEstimateResponse;
    });
    builder.addCase(estimateShipping.fulfilled, (state, action) => {
      state.order = action.payload.Order;
      state.lineItems = action.payload.LineItems;
      state.shipEstimateResponse = action.payload.ShipEstimateResponse;
    });
    builder.addCase(selectShipMethods.fulfilled, (state, action) => {
      state.order = action.payload.Order;
      state.lineItems = action.payload.LineItems;
      state.shipEstimateResponse = action.payload.ShipEstimateResponse;
    });
    builder.addCase(retrievePayments.fulfilled, (state, action) => {
      state.payments = action.payload;
    });
    builder.addCase(addPayment.fulfilled, (state, action) => {
      if (!state.payments) {
        state.payments = [action.payload];
      } else {
        state.payments.push(action.payload);
      }
    });
    builder.addCase(removePayment.fulfilled, (state, action) => {
      state.payments = state.payments.filter((p) => p.ID !== action.payload);
    });
    builder.addCase(removeAllPayments.fulfilled, (state) => {
      state.payments = [];
    });
    builder.addCase(submitOrder.fulfilled, (_, action) => {
      action.meta.arg(action.payload.order.ID);
    });
  },
});

export const { clearCurrentOrder } = ocCurrentCartSlice.actions;

export default ocCurrentCartSlice.reducer;
