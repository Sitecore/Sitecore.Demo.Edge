import { Product } from '../../models/discover/Product';

type PriceProps = {
  max: number;
  min: number;
  price: number;
  finalPrice: number;
};

const Price = (props: PriceProps): JSX.Element => {
  const { finalPrice } = props;
  // Price UI component code here.
  return window.RFK.ui.html`
    <div className="price">
      <span className="price-base">$199.99</span>
      <span className="price-discount">-20%</span>
      <span className="price-final">$${finalPrice}</span>
    </div>
  `;
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
