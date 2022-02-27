import { withDatasourceCheck, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ProductsProps = ComponentProps & {
  fields: {
    exampleToRemove: Field<string>;
  };
};

// const Products = (props: ProductsProps): JSX.Element => (
//   <div>
//     <p>{props.params.name} Component</p>
//   </div>
// );

// export default withDatasourceCheck()<ProductsProps>(Products);

// const { html } = window.RFK.ui;

const Price = ({ max, min, price, finalPrice }): JSX.Element => {
  // Price UI component code here.
};

const ProductItem = ({ includeSku, className, onClick, onDiscoverStyleOpen, ...product }): JSX.Element => {
  console.log('props of the url', product);
  const {
    product_url,
    name,
    sku,
    final_price_min_formatted,
    final_price_max_formatted,
    final_price,
    price,
    image_url,
  } = product;
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

export default ({ products = [] }) => {
  return window.RFK.ui.html`<ul class="rfksdk_preview-search_product-list">
    ${products.map(
      (p) => window.RFK.ui.html` <li class="rfksdk_preview-search_product-list__item">
        <${ProductItem} ...${p} />
      </li>`
    )}
  </ul>`;
};
