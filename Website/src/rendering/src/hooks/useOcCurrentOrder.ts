import { OcCurrentOrderState } from '../redux/ocCurrentCart';
import { useAppSelector } from '../redux/store';

const useOcCurrentOrder = (): OcCurrentOrderState => useAppSelector((s) => s.ocCurrentCart);

export default useOcCurrentOrder;
