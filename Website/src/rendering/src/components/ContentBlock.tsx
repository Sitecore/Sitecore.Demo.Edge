import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentBlockProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const ContentBlock = (props: ContentBlockProps): JSX.Element => (
  <div>
    <p>ContentBlock Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default ContentBlock;
