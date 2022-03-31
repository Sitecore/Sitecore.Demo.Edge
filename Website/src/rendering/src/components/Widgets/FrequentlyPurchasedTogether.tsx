type FrequentlyPurchasedTogetherProps = {
  loading?: boolean;
  loaded?: boolean;
  title?: string;
  products?: unknown[];
  dispatch?: () => unknown;
};

type Product = {
  image_url: string;
  name: string;
  price: string;
};

const FrequentlyPurchasedTogether = (props: FrequentlyPurchasedTogetherProps): JSX.Element => {
  return window.RFK.ui.html`
    <section>
      Cart Recommendation Widget
      ${props.products?.map((product: Product) => {
        return window.RFK.ui.html`
        <img width=200 src="${product.image_url}" />
        <div>${product.name}</div>
        <div>${product.price}</div>
        `;
      })}
    </section>
  `;
};

export default FrequentlyPurchasedTogether;
