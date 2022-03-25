import { DBuyerAddress } from '../../models/ordercloud/DBuyerAddress';
import { FormEvent, useState } from 'react';
import { GeographyService } from '../../services/GeographyService';

type AddressFormProps = {
  address?: DBuyerAddress;
  onSubmit?: (address: DBuyerAddress) => void;
};

const AddressForm = (props: AddressFormProps): JSX.Element => {
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
  const [addressName, setAddressName] = useState(
    props?.address ? props.address?.AddressName : 'Home'
  );
  const [country, setCountry] = useState(props?.address ? props.address?.Country : 'US');
  const [street1, setStreet1] = useState(
    props?.address?.ID ? props.address?.Street1 : '6818 Gaines Ferry Road'
  );
  const [street2, setStreet2] = useState(props.address?.Street2);
  const [city, setCity] = useState(props?.address ? props.address?.City : 'Flowery Branch');
  const [state, setState] = useState(props?.address ? props.address?.State : 'GA');
  const [zip, setZip] = useState(props?.address ? props.address?.Zip : '30542');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedAddress = {
      ...(props.address || {}),
      AddressName: addressName,
      Country: country,
      Street1: street1,
      Street2: street2,
      City: city,
      State: state,
      Zip: zip,
    };

    if (props.onSubmit && typeof props.onSubmit === 'function') {
      props.onSubmit(updatedAddress);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    setCountry(countryCode);
    const updatedStates = GeographyService.getStatesOrProvinces(countryCode);
    setStates(updatedStates);
    setState('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="form address-form">
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
      <div>
        <label htmlFor="country">Country</label>
        <select
          id="country"
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
      <div className="floating-label-wrap">
        <input
          type="text"
          placeholder="Street 1"
          id="street1"
          autoComplete="address-line1"
          required
          maxLength={100}
          onChange={(e) => setStreet1(e.target.value)}
          value={street1}
        />
        <label htmlFor="street1">Street 1</label>
      </div>
      <div className="floating-label-wrap">
        <input
          type="text"
          placeholder="Street 2"
          id="street2"
          autoComplete="address-line2"
          onChange={(e) => setStreet2(e.target.value)}
          value={street2}
        />
        <label htmlFor="street2">Street 2 (Optional)</label>
      </div>
      <div className="floating-label-wrap">
        <input
          type="text"
          placeholder="City"
          id="city"
          autoComplete="address-level2"
          required
          maxLength={100}
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <label htmlFor="city">City</label>
      </div>
      <div>
        <label htmlFor="stateProvince">State / Province</label>
        <select
          id="stateProvince"
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
      <div className="floating-label-wrap">
        <input
          type="text"
          id="postalCode"
          autoComplete="postal-code"
          required
          maxLength={100}
          onChange={(e) => setZip(e.target.value)}
          value={zip}
        />
        <label htmlFor="postalCode">Postal Code</label>
      </div>
      <div className="button-area">
        <button className="btn--main btn--main--round" type="submit">
          Save Address
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
