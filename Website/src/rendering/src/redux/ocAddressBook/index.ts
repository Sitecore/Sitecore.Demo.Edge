import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ListPage, Me, RequiredDeep } from 'ordercloud-javascript-sdk';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';
import { OcAddressListOptions } from '../../hooks/useOcAddressBook';
import { createOcAsyncThunk } from '../ocReduxHelpers';
import { RootState } from '../store';

export const EMPTY_ADDRESS: Partial<DBuyerAddress> = {
  AddressName: '',
  CompanyName: '',
  FirstName: '',
  LastName: '',
  Street1: '',
  Street2: '',
  City: '',
  State: '',
  Country: '',
  Zip: '',
  Phone: '',
  Billing: true,
  Shipping: true,
};

export const ocBuyerAddressAdapter = createEntityAdapter<RequiredDeep<DBuyerAddress>>({
  selectId: (a) => a.ID,
});

export const ocAddressBookSelectors = ocBuyerAddressAdapter.getSelectors<RootState>(
  (s) => s.ocAddressBook.addresses
);

export const listAddresses = createOcAsyncThunk<
  ListPage<RequiredDeep<DBuyerAddress>>,
  OcAddressListOptions
>('ocAddressBook/list', async (options) => {
  const response = await Me.ListAddresses(options);
  return response;
});

export const saveAddress = createOcAsyncThunk<RequiredDeep<DBuyerAddress>, DBuyerAddress>(
  'ocAddressBook/save',
  async (address) => {
    if (address.ID) {
      return Me.SaveAddress(address.ID, address);
    }
    return Me.CreateAddress(address);
  }
);

export const deleteAddress = createOcAsyncThunk<string, string>(
  'ocAddressBook/delete',
  async (addressId) => {
    await Me.DeleteAddress(addressId);
    return addressId;
  }
);

const initialAddressesState = ocBuyerAddressAdapter.getInitialState();

interface OcAddressBookState {
  loading: boolean;
  options: OcAddressListOptions;
  addresses: typeof initialAddressesState;
}

const initialState: OcAddressBookState = {
  loading: false,
  options: {},
  addresses: initialAddressesState,
};

const ocAddressBookSlice = createSlice({
  name: 'ocAddressBook',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(saveAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveAddress.fulfilled, (state, action) => {
      ocBuyerAddressAdapter.upsertOne(state.addresses, action.payload);
      state.loading = false;
    });
    builder.addCase(saveAddress.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      ocBuyerAddressAdapter.removeOne(state.addresses, action.payload);
      state.loading = false;
    });
    builder.addCase(deleteAddress.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(listAddresses.pending, (state, action) => {
      state.options = action.meta.arg;
      state.loading = true;
    });
    builder.addCase(listAddresses.fulfilled, (state, action) => {
      console.log('success');
      ocBuyerAddressAdapter.upsertMany(state.addresses, action.payload.Items);
      state.loading = false;
    });
    builder.addCase(listAddresses.rejected, (state, action) => {
      console.log('fail', action);
      state.loading = false;
    });
  },
  reducers: {},
});

export default ocAddressBookSlice.reducer;
