import React from 'react';
import { ComponentProps } from 'lib/component-props';

function formatBreadcrumb(text: string) {
  text = decodeURIComponent(text);
  return text;
}

type contextItem = {
  url: { path: string };
  name: string;
  pageTitle: { value: string };
  displayName: string;
  title: { value: string };
  ancestors: contextItem[];
};

type BreadcrumbProps = ComponentProps & {
  fields: {
    data: {
      item: contextItem;
      ancestors: contextItem[];
    };
  };
};

function getBreadcrumbTitle(propItem: contextItem) {
  let name = propItem.pageTitle?.value;
  if (!name) {
    name = propItem.name;
  }
  if (!name) {
    name = propItem.displayName;
  }
  if (!name) {
    name = propItem.title.value;
  }
  return formatBreadcrumb(name);
}

function getBreadcrumbUrl(propItem: contextItem) {
  return propItem?.url?.path;
}

const Breadcrumb = (props: BreadcrumbProps): JSX.Element => {
  if (props?.fields?.data?.item == null) {
    return <div></div>;
  }
  const propItem = props?.fields?.data?.item;
  const propItemAncestors = props?.fields?.data?.item?.ancestors;
  const breadcrumbs = [];

  const pageItems = {
    title: getBreadcrumbTitle(propItem),
    url: getBreadcrumbUrl(propItem),
    className: 'active',
  };

  breadcrumbs.push(pageItems);

  if (propItemAncestors) {
    propItemAncestors.map((parent) => {
      breadcrumbs.push({
        title: getBreadcrumbTitle(parent),
        url: getBreadcrumbUrl(parent),
        className: 'inactive',
      });
    });
  }

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ol className="list">
        {breadcrumbs.reverse() &&
          breadcrumbs.map((bc, index) => (
            <li key={index} className={bc.className}>
              <a href={bc.url}>{bc.title}</a>
            </li>
          ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
