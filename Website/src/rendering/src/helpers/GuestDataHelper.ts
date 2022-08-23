import { getGuestEmail, getGuestFirstName, getGuestLastName } from '../services/CdpService';

type GuestData = {
  email: string;
  firstName: string;
  lastName: string;
};

export const getUserData = async (): Promise<GuestData> => {
  const email = await getGuestEmail();
  const firstName = await getGuestFirstName();
  const lastName = await getGuestLastName();

  const guestData = {
    email: email || '',
    firstName: firstName || '',
    lastName: lastName || '',
  };

  return guestData;
};
