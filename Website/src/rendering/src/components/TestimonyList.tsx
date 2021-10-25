import { Text, RichText, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Testimony = {
  fields: {
    Provider: Field<string>;
    Testimony: Field<string>;
    Logo: ImageField;
  };
};

type TestimonyListProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Companies: Testimony[];
  };
};

const TestimonyList = (props: TestimonyListProps): JSX.Element => {
  const testimonies =
    props.fields.Companies &&
    props.fields.Companies.map((company, index) => (
      <div key={index} className="list-item">
        <div className="provider-image">
          <Image
            field={company.fields.Logo}
            alt={company.fields.Provider.value}
            width={180}
            height={180}
          />
        </div>
        <div className="testimony">
          <RichText tag="blockquote" field={company.fields.Testimony} />
          <div>
            - <Text tag="span" className="provider" field={company.fields.Provider} />
          </div>
        </div>
      </div>
    ));

  return (
    <section className="section section__testimonies">
      <div className="section__content">
        <Text
          tag="h2"
          className="section__content__title section__content__title--light"
          field={props.fields.Title}
        />
        <Text
          tag="div"
          className="section__content__p section__content__p--light"
          field={props.fields.Subtitle}
        />
        <div className="testimonies-list">{testimonies}</div>
      </div>
    </section>
  );
};

export type { Testimony };
export default TestimonyList;
