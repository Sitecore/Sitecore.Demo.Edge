import React from 'react';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';

export type ShopBreadcrumbItem = {
  urlPath: string;
  displayName: string;
  active?: boolean;
};

type ShopBreadcrumbProps = ComponentProps & {
  fields: {
    items: ShopBreadcrumbItem[] | ShopBreadcrumbItem[][];
  };
  isProductBreadcrumb?: boolean;
};

const ShopBreadcrumb = (props: ShopBreadcrumbProps): JSX.Element => {
  if (!props?.fields?.items?.length) {
    return <div></div>;
  }

  const breadcrumbs = props.isProductBreadcrumb
    ? props.fields.items
    : (props.fields.items as ShopBreadcrumbItem[]).map((breadCrumb, index) => {
        return {
          displayName: breadCrumb.displayName,
          urlPath: breadCrumb.urlPath,
          active: index === 0,
        };
      });

  const buildBreadcrumbList = (breadcrumbs: ShopBreadcrumbItem[]): JSX.Element[] => {
    return breadcrumbs.reverse().map((breadCrumb, index) => {
      const label = breadCrumb.active ? (
        <span>{breadCrumb.displayName}</span>
      ) : (
        <Link href={breadCrumb.urlPath}>{breadCrumb.displayName}</Link>
      );
      return <li key={index}>{label}</li>;
    });
  };

  const breadcrumbListItems = props.isProductBreadcrumb ? (
    breadcrumbs.map((breadcrumbArray) => (
      <ol
        key={(breadcrumbArray as ShopBreadcrumbItem[])[0].urlPath}
        className="list product-breadcrumb-list"
      >
        {buildBreadcrumbList(breadcrumbArray as ShopBreadcrumbItem[]).reverse()}
      </ol>
    ))
  ) : (
    <ol className="list">{buildBreadcrumbList(breadcrumbs as ShopBreadcrumbItem[])}</ol>
  );

  return (
    <nav className="breadcrumb shop-breadcrumb" aria-label="breadcrumbs">
      {breadcrumbListItems}
    </nav>
  );
};

export default ShopBreadcrumb;
