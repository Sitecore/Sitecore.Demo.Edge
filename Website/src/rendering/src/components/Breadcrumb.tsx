import React from 'react';
import Breadcrumbs from 'nextjs-breadcrumbs';

function formatBreadcrumb(text: string) {
  text = decodeURIComponent(text);
  text = text.replaceAll('-', ' ');
  return text;
}

const Breadcrumb = (): JSX.Element => {
  return (
    <Breadcrumbs
      activeItemClassName="active"
      containerClassName="breadcrumb"
      inactiveItemClassName="inactive"
      listClassName="list"
      transformLabel={(title) => formatBreadcrumb(title)}
    />
  );
};

export default Breadcrumb;
