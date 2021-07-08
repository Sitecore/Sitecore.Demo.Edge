import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ProductDetailProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const ProductDetail = (props: ProductDetailProps): JSX.Element => (
  <div>
    <p>ProductDetail Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default ProductDetail;
