import React, { useEffect, useState } from 'react';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { EMPTY_ADDRESS } from '../../redux/ocAddressBook';
import AddressBookForm from '../Forms/AddressBookForm';
import { Me } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import { DMeUser } from '../../models/ordercloud/DUser';

const AddressBookFormSection = (): JSX.Element => {
  const router = useRouter();
  const [address, setAddress] = useState<DBuyerAddress>(EMPTY_ADDRESS);
  const [user, setUser] = useState<DMeUser>();

  const { addressId } = router.query;

  const getUser = async () => {
    const me = await Me.Get();
    setUser(me);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      const addressToEdit = await Me.GetAddress(String(addressId));
      setAddress(addressToEdit);
    };

    if (addressId) {
      getAddress();
    }
  }, [addressId]);

  const title = addressId ? 'Edit address' : 'Create a new address';

  return (
    <section className="shop-container section address-book-form-section">
      <h1>{title}</h1>
      <div className="form-wrapper">
        <AddressBookForm address={address} user={user} isEditing={!!address.ID} />
      </div>
    </section>
  );
};

export default AddressBookFormSection;
