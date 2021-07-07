import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type AgendaGridProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const AgendaGrid = (props: AgendaGridProps): JSX.Element => (
  <div>
    <p>AgendaGrid Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default AgendaGrid;
