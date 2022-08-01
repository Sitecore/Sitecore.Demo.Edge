import { Product } from '../../models/discover/Product';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onDiscoverStyleOpen?: () => void;
  loaded: boolean;
  loading: boolean;
  altTheme?: boolean; // makes offer ribbon and price orange
  onViewMoreBtnClick?: () => void;
};

const ProductList = ({
  loaded,
  loading,
  products,
  onProductClick,
  altTheme,
  onViewMoreBtnClick,
}: ProductListProps): JSX.Element => {
  const ready = loaded && !loading;

  return (
    <>
      <ul className="product-list">
        {!ready && `...loading`}
        {ready &&
          products.map((product) => (
            <li key={product.sku} className="product-list-item">
              <ProductCard
                {...product}
                onClick={() => !!onProductClick && onProductClick(product)}
                altTheme={altTheme}
              />
            </li>
          ))}
      </ul>
      {ready && !!onViewMoreBtnClick && (
        <button className="view-more-products" onClick={() => onViewMoreBtnClick()}>
          View more
        </button>
      )}
    </>
  );
};

export default ProductList;
