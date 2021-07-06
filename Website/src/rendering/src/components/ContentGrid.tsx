import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentGridProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const ContentGrid = (props: ContentGridProps): JSX.Element => (
  <div>
    <p>ContentGrid Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default ContentGrid;
