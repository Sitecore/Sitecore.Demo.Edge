import { Product } from '../../models/discover/Product';
import ProductCard from './ProductCard';

// TODO: add story for component

type ProductListProps = {
  products: Product[];
  onProductClick?: () => void;
  onDiscoverStyleOpen?: () => void;
  loaded: boolean;
  loading: boolean;
};

const ProductList = ({
  loaded,
  loading,
  products,
  onProductClick,
}: ProductListProps): JSX.Element => {
  const ready = loaded && !loading;

  return (
    <ul className="product-list">
      {!ready && `...loading`}
      {ready &&
        products.map((product) => (
          <li key={product.sku} className="product-list-item">
            <ProductCard {...product} onClick={onProductClick} />
          </li>
        ))}
    </ul>
  );
};

export default ProductList;
