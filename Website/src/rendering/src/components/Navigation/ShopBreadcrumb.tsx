import React from 'react';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';

export type ShopBreadcrumbItem = {
  urlPath: string;
  displayName: string;
};

type ShopBreadcrumbProps = ComponentProps & {
  fields: {
    items: ShopBreadcrumbItem[];
  };
  additionalCssClass?: string;
};

const ShopBreadcrumb = (props: ShopBreadcrumbProps): JSX.Element => {
  if (!props?.fields?.items?.length) {
    return <div></div>;
  }

  const breadcrumbs = props.fields.items.map((breadCrumb, index) => {
    return {
      displayName: breadCrumb.displayName,
      urlPath: breadCrumb.urlPath,
      active: index === 0,
    };
  });

  const breadcrumbListItems = breadcrumbs.reverse().map((breadCrumb, index) => {
    const label = breadCrumb.active ? (
      <span>{breadCrumb.displayName}</span>
    ) : (
      <Link href={breadCrumb.urlPath}>{breadCrumb.displayName}</Link>
    );
    return <li key={index}>{label}</li>;
  });

  const extraCssClass = props.additionalCssClass ? props.additionalCssClass : '';

  return (
    <nav className={`breadcrumb shop-breadcrumb ${extraCssClass}`} aria-label="breadcrumbs">
      <ol className="list">{breadcrumbListItems}</ol>
    </nav>
  );
};

export default ShopBreadcrumb;
