import { OcProductListState } from '../redux/ocProductList';
import { useAppSelector } from '../redux/store';

const useOcProductList = (): OcProductListState => useAppSelector((s) => s.ocProductList);

export default useOcProductList;
