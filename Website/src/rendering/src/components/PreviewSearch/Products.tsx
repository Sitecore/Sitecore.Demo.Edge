/* eslint-disable @typescript-eslint/no-empty-function */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Price = ({ max = 0, min = 0, price = 0, finalPrice = 0 }): JSX.Element => {
  // Price UI component code here.
  return window.RFK.ui.html`$${finalPrice}`;
};

const ProductItem = ({
  includeSku = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className = '',
  onClick = (): void => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDiscoverStyleOpen = (): void => {},
  product_url = '',
  name = '',
  sku = '',
  final_price_min_formatted = 0,
  final_price_max_formatted = 0,
  final_price = 0,
  price = 0,
  image_url = '',
}): JSX.Element => {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Products = ({ products = [] }): JSX.Element => {
  return window.RFK.ui.html`<ul class="rfksdk_preview-search_product-list">
    ${products.map(
      (p) => window.RFK.ui.html` <li class="rfksdk_preview-search_product-list__item">
        <${ProductItem} ...${p} />
      </li>`
    )}
  </ul>`;
};

export default Products;
