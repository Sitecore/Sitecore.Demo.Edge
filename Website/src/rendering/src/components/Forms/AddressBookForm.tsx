import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { FormEvent, useEffect, useState } from 'react';
import { GeographyService } from '../../services/GeographyService';
import Spinner from '../../components/ShopCommon/Spinner';
import Link from 'next/link';
import { DMeUser } from '../../models/ordercloud/DUser';
import { Me } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';

type AddressBookFormProps = {
  address?: DBuyerAddress;
  user?: DMeUser;
  isEditing?: boolean;
  prefix?: string; // needed when more that one form on checkout page
};

const AddressBookForm = (props: AddressBookFormProps): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  /**
   * TODO:
   * 1. Add better postal code validation based on country selected by using masks (react-input-mask)
   * 2. Add more supported countries, currently only support US & Canada
   * 3. Disable submit button unless there are actual changes
   * 4. Add ability to discard changes (this would only be on editing addresses)
   * 5. Remove mocked address once saved addresses are a thing
   */
  const countries = GeographyService.getCountries();
  const [states, setStates] = useState(
    GeographyService.getStatesOrProvinces(props.address?.Country || countries[0].code)
  );
  const [addressName, setAddressName] = useState(props?.address?.AddressName || '');
  const [country, setCountry] = useState(props?.address?.Country || '');
  const [firstName, setFirstName] = useState(props?.address?.FirstName || '');
  const [lastName, setLastName] = useState(props?.address?.LastName || '');
  const [street1, setStreet1] = useState(props.address?.Street1 || '');
  const [street2, setStreet2] = useState(props.address?.Street2 || '');
  const [city, setCity] = useState(props?.address?.City || '');
  const [state, setState] = useState(props?.address?.State || '');
  const [zip, setZip] = useState(props?.address?.Zip || '');
  const [defaultBilling, setDefaultBilling] = useState(
    props?.address?.ID === props.user?.xp?.DefaultBillingAddressID
  );
  const [defaultShipping, setDefaultShipping] = useState(
    props?.address?.ID === props.user?.xp?.DefaultShippingAddressID
  );

  useEffect(() => {
    setStates(GeographyService.getStatesOrProvinces(props.address?.Country || countries[0].code));
    setAddressName(props?.address?.AddressName || '');
    setCountry(props?.address?.Country || '');
    setFirstName(props?.address?.FirstName || '');
    setLastName(props?.address?.LastName || '');
    setStreet1(props?.address?.Street1 || '');
    setStreet2(props?.address?.Street2 || '');
    setCity(props?.address?.City || '');
    setState(props?.address?.State || '');
    setZip(props?.address?.Zip || '');
    setDefaultBilling(props?.address?.ID === props.user?.xp?.DefaultBillingAddressID);
    setDefaultShipping(props?.address?.ID === props.user?.xp?.DefaultShippingAddressID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.address, props.user]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const updatedAddress = {
      ...(props.address || {}),
      AddressName: addressName,
      FirstName: firstName,
      LastName: lastName,
      Country: country,
      Street1: street1,
      Street2: street2,
      City: city,
      State: state,
      Zip: zip,
    };

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

  const handleCountryChange = (countryCode: string) => {
    setCountry(countryCode);
    const updatedStates = GeographyService.getStatesOrProvinces(countryCode);
    setStates(updatedStates);
    setState('');
  };

  const cancelEditButton = props.isEditing && (
    <Link href="/account/address-book">
      <a className="cancel-edit">Cancel</a>
    </Link>
  );

  const idPrefix = props.prefix ? `${props.prefix}-` : '';

  const buttonText = props.isEditing ? 'Save Address' : 'Create address';

  return (
    <form onSubmit={handleFormSubmit} className="form">
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
      <div>
        <label htmlFor={`${idPrefix}firstName`}>First name</label>
        <input
          type="text"
          id={`${idPrefix}firstName`}
          autoComplete="given-name"
          required
          maxLength={100}
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}lastName`}>Last name</label>
        <input
          type="text"
          id={`${idPrefix}lastName`}
          autoComplete="family-name"
          required
          maxLength={100}
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}street1`}>Street 1</label>
        <input
          type="text"
          id={`${idPrefix}street1`}
          autoComplete="street-address"
          required
          maxLength={100}
          onChange={(e) => setStreet1(e.target.value)}
          value={street1}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}street2`}>Street 2 (Optional)</label>
        <input
          type="text"
          id={`${idPrefix}street2`}
          autoComplete="address-line2"
          onChange={(e) => setStreet2(e.target.value)}
          value={street2}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}city`}>City</label>
        <input
          type="text"
          id={`${idPrefix}city`}
          autoComplete="address-level2"
          required
          maxLength={100}
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}country`}>Country</label>
        <select
          id={`${idPrefix}country`}
          required
          onChange={(e) => handleCountryChange(e.target.value)}
          value={country}
        >
          <option key="blank" value="">
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}stateProvince`}>State / Province</label>
        <select
          id={`${idPrefix}stateProvince`}
          required
          onChange={(e) => setState(e.target.value)}
          value={state}
        >
          <option key="blank" value="">
            Select a state
          </option>
          {states.map((state) => (
            <option key={state.abbreviation} value={state.abbreviation}>
              {state.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}postalCode`}>Postal code</label>
        <input
          type="text"
          id={`${idPrefix}postalCode`}
          autoComplete="postal-code"
          required
          maxLength={100}
          onChange={(e) => setZip(e.target.value)}
          value={zip}
        />
      </div>
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
        <button className="btn--main btn--main--round" type="submit" disabled={loading}>
          <Spinner loading={loading} /> {buttonText}
        </button>
      </div>
    </form>
  );
};

export default AddressBookForm;
