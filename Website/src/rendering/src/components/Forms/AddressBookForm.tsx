import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { FormEvent, useEffect, useState } from 'react';
import { GeographyService } from '../../services/GeographyService';
import Spinner from '../../components/ShopCommon/Spinner';
import Link from 'next/link';

type AddressBookFormProps = {
  address?: DBuyerAddress;
  onSubmit?: (address: DBuyerAddress) => void;
  isEditing?: boolean;
  onCancelEdit?: () => void;
  loading?: boolean;
  prefix?: string; // needed when more that one form on checkout page
};

const AddressBookForm = (props: AddressBookFormProps): JSX.Element => {
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
  const [billing, setBilling] = useState(props?.address?.Billing);
  const [shipping, setShipping] = useState(props?.address?.Shipping);

  // console.log(props);

  useEffect(() => {
    setAddressName(props?.address?.AddressName || '');
    setCountry(props?.address?.Country || '');
    setFirstName(props?.address?.FirstName || '');
    setLastName(props?.address?.LastName || '');
    setStreet1(props?.address?.Street1 || '');
    setStreet2(props?.address?.Street2 || '');
    setCity(props?.address?.City || '');
    setState(props?.address?.State || '');
    setZip(props?.address?.Zip || '');
    setBilling(props?.address?.Billing);
    setShipping(props?.address?.Shipping);
  }, [props.address]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      Billing: billing,
      Shipping: shipping,
    };

    if (props.onSubmit) {
      props.onSubmit(updatedAddress);
    }
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

  return (
    <form onSubmit={handleFormSubmit} className="form">
      <div>
        <label htmlFor={`${idPrefix}addressName`}>Address Name (Optional)</label>
        <input
          type="text"
          id={`${idPrefix}addressName`}
          maxLength={100}
          onChange={(e) => setAddressName(e.target.value)}
          value={addressName}
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
        <label htmlFor={`${idPrefix}firstName`}>First name</label>
        <input
          type="text"
          id={`${idPrefix}firstName`}
          autoComplete="first-name"
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
          autoComplete="last-name"
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
          autoComplete="address-line1"
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
        <label htmlFor={`${idPrefix}postalCode`}>Postal Code</label>
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
          onChange={(e) => setBilling(e.target.checked)}
          checked={billing}
        />
        <label htmlFor={`${idPrefix}billing`}>Select as default billing address</label>
      </div>
      <div>
        <input
          type="checkbox"
          id={`${idPrefix}shipping`}
          autoComplete="default-shipping"
          onChange={(e) => setShipping(e.target.checked)}
          checked={shipping}
        />
        <label htmlFor={`${idPrefix}shipping`}>Select as default shipping address</label>
      </div>
      <div className="button-area">
        <button className="btn--main btn--main--round" type="submit" disabled={props.loading}>
          <Spinner loading={props.loading} /> Save Address
        </button>
        {cancelEditButton}
      </div>
    </form>
  );
};

export default AddressBookForm;
