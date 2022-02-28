import Products from './Products';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const RightColumn = ({ products = [], loading = false, selectedKeyword = '' }): JSX.Element => {
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
