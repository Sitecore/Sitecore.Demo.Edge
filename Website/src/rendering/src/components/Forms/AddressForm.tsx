import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { useEffect, useRef, useState } from 'react';
import { GeographyService } from '../../services/GeographyService';

type AddressFormProps = {
  address?: DBuyerAddress;
  loading?: boolean;
  onChange: ({ address, isValid }: { address: DBuyerAddress; isValid: boolean }) => void;
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
  const formRef = useRef(null);
  const countries = GeographyService.getCountries();
  const [states, setStates] = useState(
    GeographyService.getStatesOrProvinces(props.address?.Country || countries[0].code)
  );
  const [country, setCountry] = useState(props?.address?.Country || '');
  const [street1, setStreet1] = useState(props.address?.Street1 || '');
  const [street2, setStreet2] = useState(props.address?.Street2 || '');
  const [city, setCity] = useState(props?.address?.City || '');
  const [state, setState] = useState(props?.address?.State || '');
  const [zip, setZip] = useState(props?.address?.Zip || '');

  useEffect(() => {
    props.onChange({
      address: {
        Country: country,
        Street1: street1,
        Street2: street2,
        City: city,
        State: state,
        Zip: zip,
      },
      isValid: formRef?.current?.checkValidity?.() || false,
    });
  }, [country, street1, street2, city, state, zip]);

  const handleCountryChange = (countryCode: string) => {
    setCountry(countryCode);
    const updatedStates = GeographyService.getStatesOrProvinces(countryCode);
    setStates(updatedStates);
    setState('');
  };

  const idPrefix = props.prefix ? `${props.prefix}-` : '';

  return (
    <form className="form" ref={formRef}>
      <div className="floating-label-wrap">
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
    </form>
  );
};

export default AddressForm;
