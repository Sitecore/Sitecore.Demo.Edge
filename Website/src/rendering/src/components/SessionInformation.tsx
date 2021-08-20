import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type Speaker = {
  fields: {
    Name: Field<string>;
    Role: Field<string>;
  };
};

export type SessionInformationProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Description: Field<string>;
    Date: Field<string>;
    Image: ImageField;
    Duration: Field<string>;
    Speakers: Speaker[];
  };
};

const SessionInformation = (props: SessionInformationProps): JSX.Element => {
  console.log(props.fields);
  return (
    <section className="section">
      <div className="section__content left__content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Image field={props.fields?.Image} alt={props.fields?.Name?.value} />
          </div>
          <div className="col-span-1 md:col-span-3 space-y-5">
            {/* TODO: Add speaker type in content hub */}
            {/* <Text tag="h3" className="uppercase" field={props.fields.Role}></Text> */}
            <Text
              tag="h2"
              className="text-2xl md:text-3xl font-extrabold text-blue"
              field={props.fields.Name}
            ></Text>
            <RichText field={props.fields.Description} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionInformation;
