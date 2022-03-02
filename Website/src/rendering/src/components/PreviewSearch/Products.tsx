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
  return window.RFK.ui.html`$${finalPrice}`;
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
  } = props;

  console.log(className, onDiscoverStyleOpen);

  return window.RFK.ui.html`<div class="rfksdk_product">
    <div class="rfksdk_product__wrapper">
      <a href=${product_url} onClick=${onClick}
        ><img class="rfksdk_product__image" src="${image_url}" alt="${name}"
      /></a>
    </div>
    <div class="rfksdk_product__info">
      <a href="${product_url}">
        ${includeSku ? window.RFK.ui.html`<div class="rfksdk_product__sku">${sku}</div>` : null}
        <div class="rfksdk_product__name">${name}</div>
      </a>
      <${Price}
        className="rfksdk_product__price"
        price=${price}
        finalPrice=${final_price}
        min=${final_price_min_formatted}
        max=${final_price_max_formatted}
      />
      <a href=${product_url} onClick=${onClick} className="rfksdk_product__view-details">View</a>
    </div>
  </div>`;
};

type ProductProps = {
  products: Product[];
};

const Products = (props: ProductProps): JSX.Element => {
  const { products } = props;

  return window.RFK.ui.html`<ul class="rfksdk_preview-search_product-list">
    ${products?.map(
      (p) => window.RFK.ui.html` <li class="rfksdk_preview-search_product-list__item">
        <${ProductItem} ...${p} />
      </li>`
    )}
  </ul>`;
};

export default Products;
