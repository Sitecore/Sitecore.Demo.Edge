import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type TextCtaProps = ComponentProps & {
  fields: {
    title: Field<string>;
    subTitle: Field<string>;
  };
};

const TextCta = (props: TextCtaProps): JSX.Element => (
  <section className="bg-black p-7">
    <div className="container text-center">
      <h1 className="text-4xl text-blue-light font-bold uppercase">
        <Text field={props.fields.title} />
      </h1>
      <p className="text-white text-lg">
        <Text field={props.fields.subTitle} />
      </p>
    </div>
  </section>
);

export default TextCta;
