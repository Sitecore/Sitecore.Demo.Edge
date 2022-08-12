import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Spinner from '../../components/ShopCommon/Spinner';
import Link from 'next/link';
import { DMeUser } from '../../models/ordercloud/DUser';
import { Me } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import AddressForm, { OnAddressChangeEvent } from './AddressForm';

type AddressBookFormProps = {
  address?: DBuyerAddress;
  user?: DMeUser;
  isEditing?: boolean;
  prefix?: string; // needed when more that one form on checkout page
};

const AddressBookForm = (props: AddressBookFormProps): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const [addressName, setAddressName] = useState(props?.address?.AddressName || '');
  const [address, setAddress] = useState(props?.address);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [defaultBilling, setDefaultBilling] = useState(
    !!props.user?.xp?.DefaultBillingAddressID &&
      props?.address?.ID === props.user?.xp?.DefaultBillingAddressID
  );
  const [defaultShipping, setDefaultShipping] = useState(
    !!props.user?.xp?.DefaultShippingAddressID &&
      props?.address?.ID === props.user?.xp?.DefaultShippingAddressID
  );

  useEffect(() => {
    setAddressName(props?.address?.AddressName || '');
    setAddress(props?.address);
    setDefaultBilling(
      !!props.user?.xp?.DefaultBillingAddressID &&
        props?.address?.ID === props.user?.xp?.DefaultBillingAddressID
    );
    setDefaultShipping(
      !!props.user?.xp?.DefaultShippingAddressID &&
        props?.address?.ID === props.user?.xp?.DefaultShippingAddressID
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.address, props.user]);

  const handleAddressFormChange = (changes: OnAddressChangeEvent) => {
    setAddress({ ...address, ...changes.address });
    setIsAddressValid(formRef?.current?.checkValidity?.() || false);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const updatedAddress = { ...address, AddressName: addressName };

    let newAddress = updatedAddress;

    if (props.isEditing) {
      await Me.PatchAddress(updatedAddress.ID, updatedAddress);
    } else {
      newAddress = await Me.CreateAddress(updatedAddress);
    }

    let updatedUser = {
      ...(props.user || {}),
    };

    if (defaultBilling) {
      updatedUser = {
        ...updatedUser,
        xp: {
          ...updatedUser.xp,
          DefaultBillingAddressID: newAddress.ID,
        },
      };
    } else if (!defaultBilling && props.user?.xp?.DefaultBillingAddressID === updatedAddress.ID) {
      updatedUser = {
        ...updatedUser,
        xp: {
          ...updatedUser.xp,
          DefaultBillingAddressID: null,
        },
      };
    }

    if (defaultShipping) {
      updatedUser = {
        ...updatedUser,
        xp: {
          ...updatedUser.xp,
          DefaultShippingAddressID: newAddress.ID,
        },
      };
    } else if (!defaultShipping && props.user?.xp?.DefaultShippingAddressID === updatedAddress.ID) {
      updatedUser = {
        ...updatedUser,
        xp: {
          ...updatedUser.xp,
          DefaultShippingAddressID: null,
        },
      };
    }

    await Me.Patch(updatedUser);

    setLoading(false);

    router.push('/account/address-book');
  };

  const cancelEditButton = props.isEditing && (
    <Link href="/account/address-book">
      <a className="cancel-edit">Cancel</a>
    </Link>
  );

  const idPrefix = props.prefix ? `${props.prefix}-` : '';

  const buttonText = props.isEditing ? 'Save Address' : 'Create address';

  return (
    <form onSubmit={handleFormSubmit} className="form" ref={formRef}>
      <div>
        <label htmlFor={`${idPrefix}addressName`}>Address name</label>
        <input
          type="text"
          id={`${idPrefix}addressName`}
          autoComplete="off"
          required
          maxLength={100}
          onChange={(e) => setAddressName(e.target.value)}
          value={addressName}
        />
      </div>
      <AddressForm address={props.address} loading={loading} onChange={handleAddressFormChange} />
      <div>
        <input
          type="checkbox"
          id={`${idPrefix}billing`}
          autoComplete="default-billing"
          onChange={(e) => setDefaultBilling(e.target.checked)}
          checked={defaultBilling}
        />
        <label htmlFor={`${idPrefix}billing`}>Set as default billing address</label>
      </div>
      <div>
        <input
          type="checkbox"
          id={`${idPrefix}shipping`}
          autoComplete="default-shipping"
          onChange={(e) => setDefaultShipping(e.target.checked)}
          checked={defaultShipping}
        />
        <label htmlFor={`${idPrefix}shipping`}>Set as default shipping address</label>
      </div>
      <div className="button-area">
        {cancelEditButton}
        <button
          className="btn-main"
          type="submit"
          disabled={!isAddressValid || !addressName || loading}
        >
          <Spinner loading={loading} /> {buttonText}
        </button>
      </div>
    </form>
  );
};

export default AddressBookForm;
