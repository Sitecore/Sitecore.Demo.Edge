import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ThreeColumnCtaProps = ComponentProps & {
  fields: {
    leftHeading: Field<string>;
    leftDescription: Field<string>;
    middleHeading: Field<string>;
    middleDescription: Field<string>;
    rightHeading: Field<string>;
    rightDescription: Field<string>;
  };
};

const ThreeColumnCta = (props: ThreeColumnCtaProps): JSX.Element => (
  <section className="section text-center bg-black py-10 hidden md:block">
    <div className="container justify-evenly text-xl flex">
      <div>
        <h2 className="text-blue-lightest text-5xl font-bold py-2">
          <Text field={props.fields.leftHeading} />
        </h2>
        <h3 className="uppercase text-white font-bold">
          <Text field={props.fields.leftDescription} />
        </h3>
      </div>
      <div className="border-l border-r border-gray px-3 lg:px-8">
        <h2 className="text-blue-lightest text-5xl font-bold py-2">
          <Text field={props.fields.middleHeading} />
        </h2>
        <h3 className="uppercase text-white font-bold">
          <Text field={props.fields.middleDescription} />
        </h3>
      </div>
      <div>
        <h2 className="text-blue-lightest text-5xl font-bold py-2">
          <Text field={props.fields.rightHeading} />
        </h2>
        <h3 className="uppercase text-white font-bold">
          <Text field={props.fields.rightDescription} />
        </h3>
      </div>
    </div>
  </section>
);

export default ThreeColumnCta;
