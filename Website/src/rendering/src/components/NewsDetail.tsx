import { RichText, Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type NewsDetailProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Excerpt: Field<string>;
    Image: ImageField;
    Content: Field<string>;
  };
};

const NewsDetail = (props: NewsDetailProps): JSX.Element => (
  <section className="section">
    <div className="section__content left__content">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-1">
          <Image field={props.fields?.Image} alt={props.fields?.Title} />
        </div>
        <div className="col-span-1 md:col-span-3 space-y-5">
          <Text
            tag="h2"
            className="text-2xl md:text-3xl font-extrabold text-blue"
            field={props.fields.Title}
          ></Text>
          <RichText tag="strong" field={props.fields.Excerpt} />
          <div>
            <RichText tag="p" field={props.fields.Content} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default NewsDetail;
