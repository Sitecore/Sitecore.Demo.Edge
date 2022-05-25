import { ocUserState } from 'src/redux/ocUser';
import { useAppSelector } from '../redux/store';

const useOcUser = (): ocUserState => useAppSelector((s) => s.ocUser);

export default useOcUser;
