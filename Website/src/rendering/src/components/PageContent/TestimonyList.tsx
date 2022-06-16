import {
  Text,
  RichText,
  Field,
  Image,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Testimony } from 'src/types/testimony';

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
    <section className="section section-testimonies">
      <div className="section-content container">
        <Text tag="h2" className="section-content-title" field={props.fields.Title} />
        <Text tag="p" className="section-content-p" field={props.fields.Subtitle} />
        <div className="testimonies-list">{testimonies}</div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<TestimonyListProps>(TestimonyList);
