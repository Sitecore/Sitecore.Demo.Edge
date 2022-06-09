import { isEqual } from 'lodash';
import { Filters, Searchable, Sortable } from 'ordercloud-javascript-sdk';
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
  addresses: DBuyerAddress[];
  saveAddress: (address: Partial<DBuyerAddress>) => void;
  deleteAddress: (addressId: string) => void;
} => {
  const dispatch = useAppDispatch();
  const { addresses, options, isAuthenticated } = useAppSelector((s) => ({
    isAuthenticated: s.ocAuth.isAuthenticated,
    addresses: ocAddressBookSelectors.selectAll(s),
    options: s.ocAddressBook.options,
  }));

  useEffect(() => {
    if (isAuthenticated && (!options || (options && !isEqual(listOptions, options)))) {
      dispatch(listAddresses(listOptions));
    }
  }, [isAuthenticated, listOptions, options, dispatch]);

  return {
    addresses,
    saveAddress: (address: Partial<DBuyerAddress>) => {
      dispatch(saveAddress(address));
    },
    deleteAddress: (addressId: string) => {
      dispatch(deleteAddress(addressId));
    },
  };
};

export default useOcAddressBook;
