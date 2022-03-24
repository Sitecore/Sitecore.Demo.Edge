import { Product } from '../../models/discover/Product';

type PriceProps = {
  max: number;
  min: number;
  price: number;
  finalPrice: number;
};

// TODO: extract Price to a separate component
const Price = (props: PriceProps): JSX.Element => {
  const { max, min, price, finalPrice } = props;

  if (max) {
    return window.RFK.ui.html`<div className="rfksdk_price price">
      <span className="rfksdk_price__range price-base">$${min} - $${max}</span>
    </div>`;
  }

  const discounted = finalPrice !== price;
  const discount = discounted ? Math.round((100 * (price - finalPrice)) / price) : 0;

  return window.RFK.ui.html`<div className=${
    discounted ? 'rfksdk_price--discounted price price-discounted' : 'price'
  }>
    <span className="rfksdk_price__original price-base">$${price}</span>
    ${
      discounted && finalPrice
        ? window.RFK.ui.html`
          <span className="rfksdk_price__final price-discount">-${discount}%</span>
          <span className="rfksdk_price__final price-final">$${finalPrice}</span>
          `
        : null
    }
  </div>`;
};

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

const ProductItem = (props: ProductItemProps): JSX.Element => {
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

  return window.RFK.ui.html`<div class="product-container">
    <div class="product-image-container">
      <a href=${product_url} onClick=${onClick}
        ><img class="product-image" src="${image_url}" alt="${name}"
      /></a>
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
  </div>`;
};

type ProductsProps = {
  products: Product[];
};

const Products = (props: ProductsProps): JSX.Element => {
  const { products } = props;

  return window.RFK.ui.html`
    <ul class="product-list-container">
      ${products?.map(
        (p) => window.RFK.ui.html` <li class="product-list-item">
          <${ProductItem} ...${p} />
        </li>`
      )}
    </ul>
  `;
};

export default Products;
