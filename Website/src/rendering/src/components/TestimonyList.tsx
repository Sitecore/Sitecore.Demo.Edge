import { Text, RichText, Field, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Testimony } from 'src/types/testimony';

type TestimonyListProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Companies: Testimony[];
  };
};

const TestimonyList = (props: TestimonyListProps): JSX.Element => (
  <section className="section section__testimonies">
    <div className="section__content">
      <Text
        tag="h2"
        className="section__content__title section__content__title--light"
        field={props.fields.Title}
      ></Text>
      <Text
        tag="div"
        className="section__content__p section__content__p--light"
        field={props.fields.Subtitle}
      ></Text>
      <div className="testimonies-list">
        {props.fields.Companies &&
          props.fields.Companies.map((testimony, index) => (
            <div key={index} className="list-item">
              <div className="provider-image">
                <Image
                  field={testimony.fields.Logo}
                  alt={testimony.fields.Provider.value}
                  width={180}
                  height={180}
                />
              </div>
              <div className="testimony">
                <RichText tag="blockquote" field={testimony.fields.Testimony} />
                <div>
                  - <Text tag="span" className="provider" field={testimony.fields.Provider} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  </section>
);

export default TestimonyList;
