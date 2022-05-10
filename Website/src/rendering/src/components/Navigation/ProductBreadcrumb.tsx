import React from 'react';
export type ProductBreadcrumbItem = {
  urlPath: string;
  displayName: string;
};

type ProductBreadcrumbProps = {
  items: ProductBreadcrumbItem[];
};

const ProductBreadcrumb = (props: ProductBreadcrumbProps): JSX.Element => {
  return <></>;
};

export default ProductBreadcrumb;
