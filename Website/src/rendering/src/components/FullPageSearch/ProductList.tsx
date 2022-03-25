import { Product } from '../../../src/models/discover/Product';

type PriceProps = {
  max: number;
  min: number;
  price: number;
  finalPrice: number;
};

type ProductListProps = {
  products: Product[];
  onProductClick: () => void;
  onDiscoverStyleOpen: () => void;
  loaded: boolean;
  loading: boolean;
};

// TODO: extract Price to a separate component
const Price = (props: PriceProps): JSX.Element => {
  const { max, min, price, finalPrice } = props;

  if (max) {
    return window.RFK.ui.html`
      <div className="price">
        <span className="price-base">$${min} - $${max}</span>
      </div>
    `;
  }

  const discounted = finalPrice !== price;
  const cssClass = discounted ? 'price price-discounted' : 'price';
  const discount = discounted ? Math.round((100 * (price - finalPrice)) / price) : 0;

  const discountAndFinalPrice =
    discounted &&
    finalPrice &&
    window.RFK.ui.html`
      <span className="price-discount">-${discount}%</span>
      <span className="price-final">$${finalPrice}</span>
    `;

  return window.RFK.ui.html`
    <div className=${cssClass}>
      <span className="price-base">$${price}</span>
      ${discountAndFinalPrice}
    </div>
  `;
};

const ProductItem = (product: Product): JSX.Element => {
  // TODO: add functionality to offer ribbon
  return window.RFK.ui.html`
    <div class="product-container">
      <div class="product-image-container">
        <a href=${product?.product_url} onClick=${product?.onClick}>
          <img class="product-image" src="${product?.image_url}" alt="${product?.name}" />
          <span className="product-offer">Spring Sale!</span>
        </a>
      </div>
      <div class="product-info-container">
        <a href="${product?.product_url} onClick=${product?.onClick}">
          <div class="product-name">${product?.name}</div>
          <div class="product-brand">${product?.brand}</div>
        </a>
        <${Price}
          price=${product?.price}
          finalPrice=${product?.final_price}
          min=${product?.final_price_min_formatted}
          max=${product?.final_price_max_formatted}
        />
      </div>
    </div>
  `;
};

const ProductList = (props: ProductListProps): JSX.Element => {
  const { products, onProductClick, loaded, loading } = props;
  const ready = loaded && !loading;

  return window.RFK.ui.html`
    <ul className="product-list-container" style="width: 100%;">
      ${!ready && window.RFK.ui.html`...loading`}
      ${
        ready &&
        products.map(
          (product) => window.RFK.ui.html`
            <li class="product-list-item">
              <${ProductItem} key=${product.sku} ...${product} onClick=${onProductClick} />
            </li>`
        )
      }
    </ul>
  `;
};

export default ProductList;
