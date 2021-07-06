import { Text, Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentBlockProps = ComponentProps & {
  fields: {
    cssClass: Field<string>;
    brightness: Field<string>;
    title: Field<string>;
    content: Field<string>;
    callToActionLink: LinkField;
  };
};

const ContentBlock = (props: ContentBlockProps): JSX.Element => (
  <div>
    <Text field={props.fields.title} />
  </div>
);

export default ContentBlock;
