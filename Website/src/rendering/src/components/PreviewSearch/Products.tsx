import { Product } from '../../models/discover/Product';

type PriceProps = {
  max: number;
  min: number;
  price: number;
  finalPrice: number;
};

const Price = (props: PriceProps): JSX.Element => {
  const { max, min, price, finalPrice } = props;

  console.log(max, min, price);
  // Price UI component code here.
  return window.RFK.ui.html`<div class="product-price">$${finalPrice}</div>`;
};

type ProductItemProps = {
  includeSku: boolean;
  className: string;
  onClick: () => void;
  onDiscoverStyleOpen: () => void;
  product_url: string;
  name: string;
  sku: string;
  final_price_min_formatted: number;
  final_price_max_formatted: number;
  final_price: number;
  price: number;
  image_url: string;
  brand: string;
};

const ProductItem = (props: ProductItemProps): JSX.Element => {
  const {
    includeSku,
    className,
    onClick,
    onDiscoverStyleOpen,
    product_url,
    name,
    sku,
    final_price_min_formatted,
    final_price_max_formatted,
    final_price,
    price,
    image_url,
    brand,
  } = props;

  console.log(className, onDiscoverStyleOpen);

  return window.RFK.ui.html`<div class="product-container">
    <div class="product-image-container">
      <a href=${product_url} onClick=${onClick}
        ><img class="product-image" src="${image_url}" alt="${name}"
      /></a>
    </div>
    <div class="product-info-container">
      <a href="${product_url}">
        ${includeSku ? window.RFK.ui.html`<div class="product-sku">${sku}</div>` : null}
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

type ProductProps = {
  products: Product[];
};

const Products = (props: ProductProps): JSX.Element => {
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
