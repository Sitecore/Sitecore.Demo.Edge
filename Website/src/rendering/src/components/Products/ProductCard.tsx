import Price from './Price';

// TODO: add story for component

type ProductItemProps = {
  className: string;
  onClick: () => void;
  onDiscoverStyleOpen: () => void;
  product_url: string;
  name: string;
  final_price_min_formatted: number;
  final_price_max_formatted: number;
  final_price: number;
  price: number;
  image_url: string;
  brand: string;
};

const ProductCard = (props: ProductItemProps): JSX.Element => {
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
  return window.RFK.ui.html`
    <div class="product-card">
      <div class="product-image-container">
        <a href=${product_url} onClick=${onClick}>
          <img class="product-image" src="${image_url}" alt="${name}"/>
          <span className="product-offer">Spring Sale!</span>
        </a>
      </div>
      <div class="product-info-container">
        <a href="${product_url}">
          <div class="product-name">${name}</div>
          <div class="product-brand">${brand}</div>
        </a>
        <${Price}
          price=${price}
          finalPrice=${final_price}
          min=${final_price_min_formatted}
          max=${final_price_max_formatted}
        />
      </div>
    </div>
  `;
};

export default ProductCard;
