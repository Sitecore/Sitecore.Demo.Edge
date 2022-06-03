import React, { useEffect, useState } from 'react';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { useAppDispatch } from '../../redux/store';
import { EMPTY_ADDRESS, saveAddress } from '../../redux/ocAddressBook';
import AddressBookForm from '../Forms/AddressBookForm';
import { Me } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import { DMeUser } from 'src/models/ordercloud/DUser';

const AddressBookFormSection = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<DBuyerAddress>(EMPTY_ADDRESS);
  const [user, setUser] = useState<DMeUser>();

  const { addressId } = router.query;

  const meUser = async () => {
    const me = await Me.Get();
    setUser(me);
  };

  useEffect(() => {
    meUser();
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

  const handleSubmit = async (address: DBuyerAddress, user: DMeUser) => {
    setLoading(true);
    await dispatch(saveAddress(address));
    await Me.Patch(user);
    setLoading(false);
    router.push('/account/address-book');
  };

  return (
    <section className="shop-container section address-book-form-section">
      <h1>{title}</h1>
      <div className="form-wrapper">
        <AddressBookForm
          address={address}
          user={user}
          loading={loading}
          onSubmit={(address, user) => handleSubmit(address, user)}
          isEditing={!!address.ID}
        />
      </div>
    </section>
  );
};

export default AddressBookFormSection;
