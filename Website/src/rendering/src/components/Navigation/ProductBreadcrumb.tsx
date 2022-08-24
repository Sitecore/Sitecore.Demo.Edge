import React from 'react';
import { Category } from '../../models/Category';
import { getCategoryChain } from '../../helpers/CategoriesDataHelper';
import ShopBreadcrumb, { ShopBreadcrumbItem } from './ShopBreadcrumb';

type ProductBreadcrumbProps = {
  productName: string;
  productUrl: string;
  ccid: string;
};

const ProductBreadcrumb = (props: ProductBreadcrumbProps): JSX.Element => {
  const categories: Category[] = getCategoryChain(props.ccid);

  const shopBreadcrumbs: ShopBreadcrumbItem[] = categories.map((category) => ({
    urlPath: category.url_path,
    displayName: category.title ? category.title : category.name,
  }));

  // Add the product itself to the breadcrumbs
  shopBreadcrumbs.unshift({
    urlPath: props.productUrl,
    displayName: props.productName,
  });

  return (
    <ShopBreadcrumb
      rendering={{ componentName: '' }}
      params={{}}
      fields={{ items: shopBreadcrumbs }}
      additionalCssClass="product-breadcrumb"
    />
  );
};

export default ProductBreadcrumb;
