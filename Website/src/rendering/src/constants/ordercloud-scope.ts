import { ApiRole } from 'ordercloud-javascript-sdk';

// scope refers to the roles that will be granted upon login (assuming the user is actually assigned those roles)
export const orderCloudScope = [
  'Shopper',
  'MeAdmin',
  'MeXpAdmin',
  'MeCreditCardAdmin',
  'MeAddressAdmin',
] as ApiRole[];
