import { BuyerAddress } from 'ordercloud-javascript-sdk';

export const isSameAddress = (address1: BuyerAddress, address2: BuyerAddress): boolean => {
  if (address1?.ID && address2?.ID && address1.ID === address2?.ID) {
    return true;
  }
  return (
    !!address1 &&
    !!address2 &&
    address1.AddressName === address2.AddressName &&
    address1.Street1 === address2.Street1 &&
    address1.Street2 === address2.Street2 &&
    address1.City === address2.City &&
    address1.State === address2.State &&
    address1.Zip === address2.Zip &&
    address1.Country === address2.Country
  );
};
