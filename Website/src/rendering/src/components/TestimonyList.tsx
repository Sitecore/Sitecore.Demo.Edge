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
  console.log(props);
  return (
    <section className="section section__testimonies testimonies-section">
      <div className="section__content section__testimonies__content">
        <Text
          tag="h2"
          className="section__content__title section__content__title--light"
          field={props.fields.Title}
        ></Text>
        <Text
          tag="div"
          className="section__content__p section__content__p--light text-sm"
          field={props.fields.Subtitle}
        ></Text>
        <div className="content-list w-full p-10">
          {props.fields.Companies &&
            props.fields.Companies.map((testimony, index) => {
              const rowClass =
                index % 2
                  ? 'Content-block h-40 w-full text-left flex flex-row gap-10'
                  : 'Content-block h-40 w-full text-left flex flex-row-reverse gap-10';
              return (
                <div key={index} className={rowClass}>
                  <div className="hidden md:block">
                    <Image
                      field={testimony.fields.Logo}
                      alt={testimony.fields.Provider.value}
                      width={180}
                      height={180}
                    />
                  </div>
                  <div>
                    <RichText
                      tag="span"
                      className="inline-block"
                      field={testimony.fields.Testimony}
                    ></RichText>
                    -{' '}
                    <Text
                      tag="span"
                      className="font-bold inline-block pt-3"
                      field={testimony.fields.Provider}
                    ></Text>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export type { Testimony };
export default TestimonyList;
