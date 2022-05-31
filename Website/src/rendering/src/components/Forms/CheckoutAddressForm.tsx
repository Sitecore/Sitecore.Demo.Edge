import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { FormEvent, useState } from 'react';
import Spinner from '../../components/ShopCommon/Spinner';
import AddressForm, { OnAddressChangeEvent } from './AddressForm';

type CheckoutAddressFormProps = {
  address?: DBuyerAddress;
  onSubmit?: (address: DBuyerAddress, saveToAddressBook: boolean) => void;
  isEditing?: boolean;
  onCancelEdit?: () => void;
  loading?: boolean;
  showSaveToAddressBook?: boolean;
  prefix?: string; // needed when more that one form on checkout page
};

const CheckoutAddressForm = (props: CheckoutAddressFormProps): JSX.Element => {
  const [addressName, setAddressName] = useState(props?.address?.AddressName || '');
  const [saveToAddressBook, setSaveToAddressBook] = useState(false);
  const [address, setAddress] = useState(props?.address);
  const [isAddressValid, setIsAddressValid] = useState(false);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(address, saveToAddressBook);
    }
  };

  const cancelEditButton = props.isEditing && (
    <button className="cancel-edit" onClick={props.onCancelEdit}>
      Cancel
    </button>
  );

  // TODO: this checkbox needs to be styled
  const saveToAddressBookInput = props.showSaveToAddressBook && (
    <div className="floating-label-wrap">
      <input
        type="checkbox"
        id="saveToAddressBook"
        onChange={() => setSaveToAddressBook(!saveToAddressBook)}
        checked={saveToAddressBook}
      />
      <label htmlFor="saveToAddressBook">Save to address book</label>
    </div>
  );

  const handleAddressFormChange = (changes: OnAddressChangeEvent) => {
    console.log(changes);
    setAddress(changes.address);
    setIsAddressValid(changes.isValid);
  };

  return (
    <form onSubmit={handleFormSubmit} className="form">
      <div className="floating-label-wrap">
        <input
          type="text"
          placeholder="Address Name"
          id="addressName"
          maxLength={100}
          onChange={(e) => setAddressName(e.target.value)}
          value={addressName}
        />
        <label htmlFor="addressName">Address Name (Optional)</label>
      </div>
      <AddressForm
        address={props.address}
        loading={props.loading}
        onChange={handleAddressFormChange}
      />
      {saveToAddressBookInput}
      <div className="button-area">
        <button
          className="btn--main btn--main--round"
          type="submit"
          disabled={!isAddressValid || props.loading}
        >
          <Spinner loading={props.loading} /> Save Address
        </button>
        {cancelEditButton}
      </div>
    </form>
  );
};

export default CheckoutAddressForm;
