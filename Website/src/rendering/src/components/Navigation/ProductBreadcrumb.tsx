import React from 'react';
import ShopBreadcrumb, { ShopBreadcrumbItem } from './ShopBreadcrumb';
import { DProductXp } from '../../models/ordercloud/DProduct';

type ProductBreadcrumbProps = {
  productName: string;
  productUrl: string;
  categoryBreadcrumbs: DProductXp['CategoryBreadcrumbs'];
};

const ProductBreadcrumb = (props: ProductBreadcrumbProps): JSX.Element => {
  const shopBreadcrumbs: ShopBreadcrumbItem[][] = [];

  props.categoryBreadcrumbs.forEach((breadcrumb) => {
    const itemNames = breadcrumb.BreadcrumbsName.split('>').reverse();
    const itemPaths = breadcrumb.UrlPath.split('/');

    const breadcrumbs = itemNames.map((name, index) => ({
      displayName: name,
      urlPath: index === 0 ? itemPaths.join('/') : itemPaths.slice(0, -index).join('/'),
    }));
    shopBreadcrumbs.push(breadcrumbs);
  });

  return (
    <>
      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: shopBreadcrumbs }}
        isProductBreadcrumb={true}
      />
    </>
  );
};

export default ProductBreadcrumb;
