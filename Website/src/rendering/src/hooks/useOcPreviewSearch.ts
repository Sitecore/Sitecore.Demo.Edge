import { OcPreviewSearchState } from 'src/redux/ocPreviewSearch';
import { useAppSelector } from '../redux/store';

const useOcPreviewSearch = (): OcPreviewSearchState => useAppSelector((s) => s.ocPreviewSearch);

export default useOcPreviewSearch;
