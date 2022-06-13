import Link from 'next/link';
import Price from './Price';

// TODO: add story for component

type ProductCardProps = {
  className?: string;
  onClick?: () => void;
  onDiscoverStyleOpen?: () => void;
  product_url?: string;
  name?: string;
  final_price_min_formatted?: number;
  final_price_max_formatted?: number;
  final_price?: string;
  price?: string;
  image_url?: string;
  brand?: string;
  altTheme?: boolean;
};

const ProductCard = ({
  onClick,
  product_url,
  name,
  final_price_min_formatted,
  final_price_max_formatted,
  final_price,
  price,
  image_url,
  brand,
  altTheme,
}: ProductCardProps): JSX.Element => {
  // TODO: add functionality to offer ribbon
  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link href={product_url}>
          <a onClick={onClick}>
            <img className="product-image" src={image_url} alt={name} />
            {/* TODO: Extract JSX logic into a const */}
            <span className={`product-offer ${altTheme ? 'product-offer-orange' : ''}`}>
              Spring Sale!
            </span>
          </a>
        </Link>
      </div>
      <div className="product-info-container">
        <Link href={product_url}>
          <a onClick={onClick}>
            <div className="product-name">{name}</div>
            <div className="product-brand">{brand}</div>
          </a>
        </Link>
        <Price
          price={price}
          finalPrice={final_price}
          min={final_price_min_formatted}
          max={final_price_max_formatted}
          altTheme={altTheme}
        />
      </div>
    </div>
  );
};

export default ProductCard;
