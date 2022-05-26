import { OcAuthState } from '../redux/ocAuth';
import { useAppSelector } from '../redux/store';

const useOcAuth = (): OcAuthState => useAppSelector((s) => s.ocAuth);

export default useOcAuth;
