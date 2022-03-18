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
};

const ShopBreadcrumb = (props: ShopBreadcrumbProps): JSX.Element => {
  if (!props?.fields?.items?.length) {
    return <div></div>;
  }

  const breadcrumbs = props.fields.items.map((breadCrumb, index) => {
    const definition = {
      displayName: breadCrumb.displayName,
      urlPath: breadCrumb.urlPath,
      className: 'active',
    };
    definition.className = index === 0 ? 'active' : 'inactive';
    return definition;
  });

  const breadcrumbListItems = breadcrumbs.reverse().map((breadCrumb, index) => (
    <li key={index} className={breadCrumb.className}>
      <Link href={breadCrumb.urlPath}>{breadCrumb.displayName}</Link>
    </li>
  ));

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ol className="list">{breadcrumbListItems}</ol>
    </nav>
  );
};

export default ShopBreadcrumb;
