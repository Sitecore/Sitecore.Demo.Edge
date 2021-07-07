import React from 'react';
import Breadcrumbs from 'nextjs-breadcrumbs';

const Breadcrumb = (): JSX.Element => {
  return (
    <section className="">
      <Breadcrumbs
        activeItemClassName="active"
        containerClassName="breadcrumb"
        inactiveItemClassName="inactive"
        listClassName="list"
        useDefaultStyle
        rootLabel="Home"
      />
    </section>
  );
};

export default Breadcrumb;
