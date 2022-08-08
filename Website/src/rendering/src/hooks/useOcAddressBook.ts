import { isEqual } from 'lodash';
import { Filters, RequiredDeep, Searchable, Sortable } from 'ordercloud-javascript-sdk';
import { useEffect } from 'react';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';
import {
  deleteAddress,
  listAddresses,
  ocAddressBookSelectors,
  saveAddress,
} from '../redux/ocAddressBook';
import { useAppDispatch, useAppSelector } from '../redux/store';

export interface OcAddressListOptions {
  search?: string;
  searchOn?: Searchable<'Me.ListAddresses'>;
  sortBy?: Sortable<'Me.ListAddresses'>;
  page?: number;
  pageSize?: number;
  filters?: Filters;
}

const useOcAddressBook = (
  listOptions?: OcAddressListOptions
): {
  addressBookLoading: boolean;
  addresses: DBuyerAddress[];
  saveAddress: (address: Partial<DBuyerAddress>) => Promise<RequiredDeep<DBuyerAddress>>;
  deleteAddress: (addressId: string) => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const { addresses, options, isAuthenticated, loading } = useAppSelector((s) => ({
    isAuthenticated: s.ocAuth.isAuthenticated,
    addresses: ocAddressBookSelectors.selectAll(s),
    options: s.ocAddressBook.options,
    loading: s.ocAddressBook.loading,
  }));

  useEffect(() => {
    if (isAuthenticated && (!options || (options && !isEqual(listOptions, options)))) {
      dispatch(listAddresses(listOptions));
    }
  }, [isAuthenticated, listOptions, options, dispatch]);

  return {
    addressBookLoading: loading,
    addresses,
    saveAddress: async (address: Partial<DBuyerAddress>) => {
      return await dispatch(saveAddress(address)).unwrap();
    },
    deleteAddress: async (addressId: string) => {
      await dispatch(deleteAddress(addressId));
    },
  };
};

export default useOcAddressBook;
