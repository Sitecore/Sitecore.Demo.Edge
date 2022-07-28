import { OcProductListState } from 'src/redux/ocProductList';
import { useAppSelector } from '../redux/store';

const useOcProductList = (): OcProductListState => useAppSelector((s) => s.ocProductList);

export default useOcProductList;
