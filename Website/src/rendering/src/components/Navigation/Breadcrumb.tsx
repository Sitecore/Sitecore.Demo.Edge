import React from 'react';
import { ComponentProps } from 'lib/component-props';

type Breadcrumb = {
  urlPath: string;
  displayName: string;
};

type BreadcrumbProps = ComponentProps & {
  fields: {
    items: Breadcrumb[];
  };
};

function getBreadcrumbTitle(breadcrumb: Breadcrumb) {
  return decodeURIComponent(breadcrumb.displayName);
}

function getBreadcrumbUrl(breadcrumb: Breadcrumb) {
  return breadcrumb?.urlPath;
}

const Breadcrumb = (props: BreadcrumbProps): JSX.Element => {
  if (!props?.fields?.items?.length) {
    return <div></div>;
  }

  const breadcrumbs = props.fields.items.map((bc, index) => {
    const definition = {
      title: getBreadcrumbTitle(bc),
      url: getBreadcrumbUrl(bc),
      className: 'active',
    };
    definition.className = index === 0 ? 'active' : 'inactive';
    return definition;
  });

  const breadcrumbListItems = breadcrumbs.reverse().map((bc, index) => (
    <li key={index} className={bc.className}>
      <a title={bc.title} href={bc.url}>
        {bc.title}
      </a>
    </li>
  ));

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ol className="list">{breadcrumbListItems}</ol>
    </nav>
  );
};

export default Breadcrumb;
