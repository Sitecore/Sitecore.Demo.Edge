import { OcCurrentOrderState } from '../redux/ocCurrentCart';
import { useAppSelector } from '../redux/store';

const useOcCurrentCart = (): OcCurrentOrderState => useAppSelector((s) => s.ocCurrentCart);

export default useOcCurrentCart;
