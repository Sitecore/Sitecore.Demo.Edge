import React, { useEffect, useState } from 'react';
import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { useAppDispatch } from '../../redux/store';
import { EMPTY_ADDRESS, saveAddress } from '../../redux/ocAddressBook';
import AddressBookForm from '../Forms/AddressBookForm';
import { Me } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';

const AddressBookFormSection = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<DBuyerAddress>(EMPTY_ADDRESS);

  const { addressId } = router.query;

  const getAddress = async () => {
    const addressToEdit = await Me.GetAddress(String(addressId));
    setAddress(addressToEdit);
  };

  useEffect(() => {
    addressId && getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId]);

  const title = addressId ? 'Edit address' : 'Create a new address';

  const handleSubmit = async (address: DBuyerAddress) => {
    setLoading(true);
    await dispatch(saveAddress(address));
    setLoading(false);
    router.push('/account/address-book');
  };

  return (
    <section className="shop-container section address-book-form-section">
      <h1>{title}</h1>
      <div className="form-wrapper">
        <AddressBookForm
          address={address}
          loading={loading}
          onSubmit={(address) => handleSubmit(address)}
          isEditing={!!address.ID}
        />
      </div>
    </section>
  );
};

export default AddressBookFormSection;
