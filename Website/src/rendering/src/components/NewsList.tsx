import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type NewsListProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const NewsList = (props: NewsListProps): JSX.Element => (
  <div>
    <p>NewsList Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default NewsList;
