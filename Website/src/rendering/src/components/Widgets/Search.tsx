// type SearchProps;
// const { html, useRef, useEffect, useState } = window.RFK.ui;

type Product = {
  image_url: string;
  name: string;
  price: string;
};

const Search = (props: any): JSX.Element => {
  console.log('search props', props);
  return RFK.ui.html`
    <section>
    ${console.log('search props', { props })}
    Search Widget To Go Here
    ${props.products?.map((product: Product) => {
      return RFK.ui.html`
        <img width=200 src="${product.image_url}" />
        <div>${product.name}</div>
        <div>${product.price}</div>
        `;
    })}
    </section>
    `;
};

export default Search;
