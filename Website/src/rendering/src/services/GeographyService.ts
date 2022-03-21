export interface countryCodeDefinition {
  label: string;
  code: string; // two letter code
  icon: string;
  postalCodeMask: string | (string | RegExp)[]; // a react-input compatible mask that will validate and restrict user input for zip code (postalCode) https://www.npmjs.com/package/react-input-mask
  stateOrProvince: 'state' | 'province';
}

export interface StateOrProvinceDefinition {
  label: string;
  abbreviation: string;
  countryCode: string;
}

function getCanadianPostalCodeMask(): (string | RegExp)[] {
  const firstLetter = /(?!.*[DFIOQU])[A-VXY]/i;
  const letter = /(?!.*[DFIOQU])[A-Z]/i;
  const digit = /[0-9]/;
  return [firstLetter, digit, letter, ' ', digit, letter, digit];
}

export class GeographyService {
  static getCountries(): countryCodeDefinition[] {
    return [
      {
        label: 'United States of America',
        code: 'US',
        icon: 'data:image/jpg;base64,R0lGODlhEAAQANUAALoBFOkIH+oJIMUIG+oQJusWLNUXKuQoPO0uQu04S+4+Ue9BU/BQYPJjcQ4ObRAQbxsbax8feCwsfTMzhDw8iUNDjUVFj1JTl1JSllNTl1VVmHx8t3R0q319t4ODu4CAsZCQwo+PwJmZx5iYxpqax6Ghy6ur0bOz1f////z8/O/v79/f39DQ0P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAQABAAAAZswJZwSCwaj0ULSckkLZ5Q4YhzolpR2KyQYrqUMiVMiUFmNBLCkEZUYbOz2JRQIpqA7HaEHqE4CD8RHQ+CgnAoKkIQHg4bjIwCkAIFBkIrhpcoK0IDBAGen6AEA0IsmIYsQgCqq6ysSK+wsbFBADs=',
        postalCodeMask: '99999',
        stateOrProvince: 'state',
      },
      {
        label: 'Canada',
        code: 'CA',
        icon: 'data:image/jpg;base64,R0lGODlhEAAQAOYAAPKpqvXCw64HDbIJD64JDrILENsQF9sRGLkPFNsTGbkQFtwVG9wVHNwXHsEVGtwZH8EXHN0bId0cIt0dI90eJN0fJcgdI94hJ8gfJN4jKd4kKd4kKt4lK9AmLN4qMNAoLd8sMdgvNdgwNuE3POE4Pd44PeE6QN45P+I+ROJARuNCR+NDSeNFS+RHTeNHS+NHTORJTuRLUORPVOVWW+ZZXuZdYehpbet2eut3e++ZnPCfovSws/OvsfSztvOytPbExvrd3vnc3fre3/vj5PfNz/zs7P75+f77+//9/f/+/v///8zMzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEwALAAAAAAQABAAAAeVgEyCg4SFhoeFLTAwSo2OjYswgis3N4+PODcsgig2M41JQUFJjTM2KYIlNC+NRTU1Ro0vNCeCIS4kQwA7KjI8PUMjLiKCHRoLASAXGRwSMQEMGx+CFhUJSEQeFBMmQkcJFRiCDhEGjT45Oj+NBhEQgggPB45AQI4HDwqCAw0Nl479CggSQIDAkoMIDxYkgKihw4cPAwEAOw==',
        postalCodeMask: getCanadianPostalCodeMask(),
        stateOrProvince: 'province',
      },
    ];
  }

  static getStatesOrProvinces(countryCode: string): StateOrProvinceDefinition[] {
    return this.statesOrProvinces.filter(
      (stateOrProvince) => stateOrProvince.countryCode === countryCode
    );
  }

  private static statesOrProvinces: StateOrProvinceDefinition[] = [
    { label: 'Alabama', abbreviation: 'AL', countryCode: 'US' },
    { label: 'Alaska', abbreviation: 'AK', countryCode: 'US' },
    { label: 'Arizona', abbreviation: 'AZ', countryCode: 'US' },
    { label: 'Arkansas', abbreviation: 'AR', countryCode: 'US' },
    { label: 'California', abbreviation: 'CA', countryCode: 'US' },
    { label: 'Colorado', abbreviation: 'CO', countryCode: 'US' },
    { label: 'Connecticut', abbreviation: 'CT', countryCode: 'US' },
    { label: 'Delaware', abbreviation: 'DE', countryCode: 'US' },
    { label: 'District of Columbia', abbreviation: 'DC', countryCode: 'US' },
    { label: 'Florida', abbreviation: 'FL', countryCode: 'US' },
    { label: 'Georgia', abbreviation: 'GA', countryCode: 'US' },
    { label: 'Hawaii', abbreviation: 'HI', countryCode: 'US' },
    { label: 'Idaho', abbreviation: 'ID', countryCode: 'US' },
    { label: 'Illinois', abbreviation: 'IL', countryCode: 'US' },
    { label: 'Indiana', abbreviation: 'IN', countryCode: 'US' },
    { label: 'Iowa', abbreviation: 'IA', countryCode: 'US' },
    { label: 'Kansas', abbreviation: 'KS', countryCode: 'US' },
    { label: 'Kentucky', abbreviation: 'KY', countryCode: 'US' },
    { label: 'Louisiana', abbreviation: 'LA', countryCode: 'US' },
    { label: 'Maine', abbreviation: 'ME', countryCode: 'US' },
    { label: 'Maryland', abbreviation: 'MD', countryCode: 'US' },
    { label: 'Massachusetts', abbreviation: 'MA', countryCode: 'US' },
    { label: 'Michigan', abbreviation: 'MI', countryCode: 'US' },
    { label: 'Minnesota', abbreviation: 'MN', countryCode: 'US' },
    { label: 'Mississippi', abbreviation: 'MS', countryCode: 'US' },
    { label: 'Missouri', abbreviation: 'MO', countryCode: 'US' },
    { label: 'Montana', abbreviation: 'MT', countryCode: 'US' },
    { label: 'Nebraska', abbreviation: 'NE', countryCode: 'US' },
    { label: 'Nevada', abbreviation: 'NV', countryCode: 'US' },
    { label: 'New Hampshire', abbreviation: 'NH', countryCode: 'US' },
    { label: 'New Jersey', abbreviation: 'NJ', countryCode: 'US' },
    { label: 'New Mexico', abbreviation: 'NM', countryCode: 'US' },
    { label: 'New York', abbreviation: 'NY', countryCode: 'US' },
    { label: 'North Carolina', abbreviation: 'NC', countryCode: 'US' },
    { label: 'North Dakota', abbreviation: 'ND', countryCode: 'US' },
    { label: 'Ohio', abbreviation: 'OH', countryCode: 'US' },
    { label: 'Oklahoma', abbreviation: 'OK', countryCode: 'US' },
    { label: 'Oregon', abbreviation: 'OR', countryCode: 'US' },
    { label: 'Pennsylvania', abbreviation: 'PA', countryCode: 'US' },
    { label: 'Rhode Island', abbreviation: 'RI', countryCode: 'US' },
    { label: 'South Carolina', abbreviation: 'SC', countryCode: 'US' },
    { label: 'South Dakota', abbreviation: 'SD', countryCode: 'US' },
    { label: 'Tennessee', abbreviation: 'TN', countryCode: 'US' },
    { label: 'Texas', abbreviation: 'TX', countryCode: 'US' },
    { label: 'Utah', abbreviation: 'UT', countryCode: 'US' },
    { label: 'Vermont', abbreviation: 'VT', countryCode: 'US' },
    { label: 'Virginia', abbreviation: 'VA', countryCode: 'US' },
    { label: 'Washington', abbreviation: 'WA', countryCode: 'US' },
    { label: 'West Virginia', abbreviation: 'WV', countryCode: 'US' },
    { label: 'Wisconsin', abbreviation: 'WI', countryCode: 'US' },
    { label: 'Wyoming', abbreviation: 'WY', countryCode: 'US' },
    {
      label: 'Armed Forces Americas (AA)',
      abbreviation: 'AA',
      countryCode: 'US',
    },
    {
      label: 'Armed Forces Africa/Canada/Europe/Middle East (AE)',
      abbreviation: 'AE',
      countryCode: 'US',
    },
    { label: 'Armed Forces Pacific (AP)', abbreviation: 'AP', countryCode: 'US' },
    { label: 'American Samoa', abbreviation: 'AS', countryCode: 'US' },
    {
      label: 'Federated States of Micronesia',
      abbreviation: 'FM',
      countryCode: 'US',
    },
    { label: 'Guam', abbreviation: 'GU', countryCode: 'US' },
    { label: 'Marshall Islands', abbreviation: 'MH', countryCode: 'US' },
    { label: 'Northern Mariana Islands', abbreviation: 'HS', countryCode: 'US' },
    { label: 'Palau', abbreviation: 'PW', countryCode: 'US' },
    { label: 'Puerto Rico', abbreviation: 'PR', countryCode: 'US' },
    { label: 'Virgin Islands', abbreviation: 'VI', countryCode: 'US' },

    // Canada
    { label: 'Ontario', abbreviation: 'ON', countryCode: 'CA' },
    { label: 'Quebec', abbreviation: 'QC', countryCode: 'CA' },
    { label: 'Nova Scotia', abbreviation: 'NS', countryCode: 'CA' },
    { label: 'New Brunswick', abbreviation: 'NB', countryCode: 'CA' },
    { label: 'Manitoba', abbreviation: 'MB', countryCode: 'CA' },
    { label: 'British Columbia', abbreviation: 'BC', countryCode: 'CA' },
    { label: 'Prince Edward Island', abbreviation: 'PE', countryCode: 'CA' },
    { label: 'Saskatchewan', abbreviation: 'SK', countryCode: 'CA' },
    { label: 'Alberta', abbreviation: 'AB', countryCode: 'CA' },
    { label: 'Newfoundland and Labrador', abbreviation: 'NL', countryCode: 'CA' },
  ];
}
