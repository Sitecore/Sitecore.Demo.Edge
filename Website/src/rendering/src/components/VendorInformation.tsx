import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type VendorInformationProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const VendorInformation = (props: VendorInformationProps): JSX.Element => (
  <div>
    <p>VendorInformation Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default VendorInformation;
