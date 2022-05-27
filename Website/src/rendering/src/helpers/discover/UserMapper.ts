import { UserEventModel } from '@sitecore-discover/react';
import { User } from 'ordercloud-javascript-sdk';

export default function mapUserForDiscover(user: User): UserEventModel {
  return {
    email: user.Email,
    id: user.ID,
  };
}
