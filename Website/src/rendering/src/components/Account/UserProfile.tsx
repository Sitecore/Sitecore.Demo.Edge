import useOcUser from '../../hooks/useOcUser';
import UserProfileContent from './UserProfileContent';

const UserProfile = (): JSX.Element => {
  const { user, loading } = useOcUser();

  return !loading ? <UserProfileContent user={user} /> : null;
};

export default UserProfile;
