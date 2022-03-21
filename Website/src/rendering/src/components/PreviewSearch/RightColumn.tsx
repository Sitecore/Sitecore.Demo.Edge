import { Product } from '../../models/discover/Product';
import Products from './Products';

type RightColumnProps = {
  products: Product[];
  loading: boolean;
  selectedKeyword: string;
};

const RightColumn = (props: RightColumnProps): JSX.Element => {
  const { products, loading } = props;

  return window.RFK.ui.html`
    <div class="rightSection">
      ${!loading && window.RFK.ui.html`<${Products} products=${products} loading=${loading} />`}
      ${loading && window.RFK.ui.html`loading .....`}
    </div>
  `;
};

export default RightColumn;
