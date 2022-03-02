import Products from './Products';

type RightColumnProps = {
  products: [];
  loading: boolean;
  selectedKeyword: string;
};

const RightColumn = (props: RightColumnProps): JSX.Element => {
  const { products, loading, selectedKeyword } = props;

  return window.RFK.ui.html`
    <div class="rightSection">
      ${
        selectedKeyword &&
        selectedKeyword !== '' &&
        window.RFK.ui
          .html`<h2 class="rightSection__title">Top results for "${selectedKeyword}"</h2>`
      }
      ${!loading && window.RFK.ui.html`<${Products} products=${products} loading=${loading} />`}
      ${loading && window.RFK.ui.html`loading .....`}
    </div>
  `;
};

export default RightColumn;
