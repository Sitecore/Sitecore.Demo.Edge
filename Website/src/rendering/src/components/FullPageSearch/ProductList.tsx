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

const ProductItem = (product: Product): JSX.Element => {
  return window.RFK.ui.html`
  <div class="rfksdk_product rfk_sp_product product-container">
    <div class="rfksdk_product__wrapper product-image-container">
      <a href=${product?.product_url} onClick=${product?.onClick}
        ><img class="rfksdk_product__image product-image" src="${product?.image_url}" alt="${product?.name}"
      /></a>
    </div>
    <div class="rfksdk_product__info product-info-container">
      <a href="${product?.product_url} onClick=${product?.onClick}">
        <div class="rfksdk_product__name product-name">${product?.name}</div>
        <div class="rfksdk_product__name product-brand">${product?.brand}</div>
      </a>
      <${Price}
        className="rfksdk_product__price"
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
  <ul className="rfk_products product-list-container" style="width: 100%;">
    ${!ready ? window.RFK.ui.html`...loading` : null}
    ${
      ready &&
      products.map(
        (product) => window.RFK.ui.html` <li class="rfk_product product-list-item">
          <${ProductItem} key=${product.sku} ...${product} onClick=${onProductClick} />
      </li>`
      )
    }
  </ul>
  `;
};

export default ProductList;
