import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { useEffect, useState } from 'react';
import { GeographyService } from '../../services/GeographyService';

type AddressFormProps = {
  address?: DBuyerAddress;
  loading?: boolean;
  onChange: ({ address }: { address: DBuyerAddress }) => void;
  prefix?: string; // needed when more that one form on checkout page
};

export type OnAddressChangeEvent = {
  address: DBuyerAddress;
  isValid: boolean;
};

const AddressForm = (props: AddressFormProps): JSX.Element => {
  /**
   * TODO:
   * 1. Add better postal code validation based on country selected by using masks (react-input-mask)
   * 2. Add more supported countries, currently only support US & Canada
   */
  const countries = GeographyService.getCountries();
  const [states, setStates] = useState(
    GeographyService.getStatesOrProvinces(props.address?.Country || countries[0].code)
  );
  const [firstName, setFirstName] = useState(props?.address?.FirstName || '');
  const [lastName, setLastName] = useState(props?.address?.LastName || '');
  const [street1, setStreet1] = useState(props.address?.Street1 || '');
  const [street2, setStreet2] = useState(props.address?.Street2 || '');
  const [city, setCity] = useState(props?.address?.City || '');
  const [country, setCountry] = useState(props?.address?.Country || '');
  const [state, setState] = useState(props?.address?.State || '');
  const [zip, setZip] = useState(props?.address?.Zip || '');

  useEffect(() => {
    props.onChange({
      address: {
        FirstName: firstName,
        LastName: lastName,
        Street1: street1,
        Street2: street2,
        City: city,
        Country: country,
        State: state,
        Zip: zip,
        Shipping: true,
        Billing: true,
      },
    });
    // We do not add 'props' to the useEffect dependencies to avoid a render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, street1, street2, city, state, zip, firstName, lastName]);

  useEffect(() => {
    setStates(GeographyService.getStatesOrProvinces(props.address?.Country || countries[0].code));
    setCountry(props?.address?.Country || '');
    setFirstName(props?.address?.FirstName || '');
    setLastName(props?.address?.LastName || '');
    setStreet1(props?.address?.Street1 || '');
    setStreet2(props?.address?.Street2 || '');
    setCity(props?.address?.City || '');
    setState(props?.address?.State || '');
    setZip(props?.address?.Zip || '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.address]);

  const handleCountryChange = (countryCode: string) => {
    setCountry(countryCode);
    const updatedStates = GeographyService.getStatesOrProvinces(countryCode);
    setStates(updatedStates);
    setState('');
  };

  const idPrefix = props.prefix ? `${props.prefix}-` : '';

  return (
    <>
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
        <label htmlFor={`${idPrefix}postalCode`}>Postal / Zip Code</label>
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
    </>
  );
};

export default AddressForm;
