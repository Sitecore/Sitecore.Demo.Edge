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
};

const ProductCard = (props: ProductCardProps): JSX.Element => {
  const {
    onClick,
    product_url,
    name,
    final_price_min_formatted,
    final_price_max_formatted,
    final_price,
    price,
    image_url,
    brand,
  } = props;

  // TODO: add functionality to offer ribbon
  return (
    <div className="product-card">
      <div className="product-image-container">
        <a href={product_url} onClick={onClick}>
          <img className="product-image" src={image_url} alt="{name}" />
          <span className="product-offer">Spring Sale!</span>
        </a>
      </div>
      <div className="product-info-container">
        <a href={product_url}>
          <div className="product-name">{name}</div>
          <div className="product-brand">{brand}</div>
        </a>
        <Price
          price={price}
          finalPrice={final_price}
          min={final_price_min_formatted}
          max={final_price_max_formatted}
        />
      </div>
    </div>
  );
};

export default ProductCard;
