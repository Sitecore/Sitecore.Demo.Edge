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

const ProductList = (props: ProductListProps): JSX.Element => {
  const { loaded, loading, products, onProductClick } = props;
  const ready = loaded && !loading;

  return (
    <ul className="product-list">
      {!ready && `...loading`}
      {ready &&
        products.map((product) => (
          <li key={product.sku} className="product-list-item">
            <ProductCard
              key={product.sku}
              product_url={product.product_url}
              name={product.name}
              final_price_min_formatted={product.final_price_min_formatted}
              final_price_max_formatted={product.final_price_max_formatted}
              final_price={product.final_price}
              price={product.price}
              image_url={product.image_url}
              brand={product.brand}
              onClick={onProductClick}
            />
          </li>
        ))}
    </ul>
  );
};

export default ProductList;
