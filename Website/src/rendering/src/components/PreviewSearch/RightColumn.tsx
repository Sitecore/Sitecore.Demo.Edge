import { withDatasourceCheck, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Products from './Products';

type RightColumnProps = ComponentProps & {
  fields: {
    exampleToRemove: Field<string>;
  };
};

// const { html } = window.RFK.ui;

const RightColumn = ({ products, loading, selectedKeyword }): JSX.Element => {
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

// const RightColumn = (props: RightColumnProps): JSX.Element => (
//   <div>
//     <p>{props.params.name} Component</p>
//   </div>
// );

// export default withDatasourceCheck()<RightColumnProps>(RightColumn);
