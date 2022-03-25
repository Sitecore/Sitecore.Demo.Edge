import { Product } from '../../../src/models/discover/Product';
import ProductCard from './ProductCard';

// TODO: add story for component

type ProductListProps = {
  products: Product[];
  onProductClick: () => void;
  onDiscoverStyleOpen: () => void;
  loaded: boolean;
  loading: boolean;
};

const ProductList = (props: ProductListProps): JSX.Element => {
  const { loaded, loading, products, onProductClick } = props;
  const ready = loaded && !loading;

  return window.RFK.ui.html`
    <ul className="product-list">
      ${!ready && window.RFK.ui.html`...loading`}
      ${
        ready &&
        products.map(
          (product) => window.RFK.ui.html`
            <li class="product-list-item">
              <${ProductCard} key=${product.sku} ...${product} onClick=${onProductClick} />
            </li>`
        )
      }
    </ul>
  `;
};

export default ProductList;
