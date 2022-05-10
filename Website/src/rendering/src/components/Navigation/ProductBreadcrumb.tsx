import React from 'react';
import ShopBreadcrumb, { ShopBreadcrumbItem } from './ShopBreadcrumb';
import { DProductXp } from '../../models/ordercloud/DProduct';

type ProductBreadcrumbProps = {
  categoryBreadcrumbs: DProductXp['CategoryBreadcrumbs'];
};

const ProductBreadcrumb = (props: ProductBreadcrumbProps): JSX.Element => {
  const shopBreadcrumbItems: ShopBreadcrumbItem[] = [];

  props.categoryBreadcrumbs.forEach((breadcrumb) => {
    const itemNames = breadcrumb.BreadcrumbsName.split('>').reverse();
    const itemPaths = breadcrumb.UrlPath.split('/');

    const breadcrumbs = itemNames.map((name, index) => ({
      displayName: name,
      urlPath: index === 0 ? itemPaths.join('/') : itemPaths.slice(0, -index).join('/'),
    }));
    shopBreadcrumbItems.push(...breadcrumbs);
  });
  return (
    <>
      <ShopBreadcrumb
        rendering={{ componentName: '' }}
        params={{}}
        fields={{ items: shopBreadcrumbItems }}
      />
    </>
  );
};

export default ProductBreadcrumb;
