import {
  RichText,
  Text,
  Field,
  ImageField,
  Image,
  DateField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type NewsDetailProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Excerpt: Field<string>;
    PublishDate: Field<string>;
    Image: ImageField;
    Content: Field<string>;
  };
};

const NewsDetail = (props: NewsDetailProps): JSX.Element => (
  <section className="section section__news--detail">
    <div className="section__content left__content">
      <div className="container">
        <div className="left-column">
          <Image field={props.fields?.Image} alt={props.fields?.Title} />
        </div>
        <div className="right-column">
          <DateField
            tag="h3"
            className="uppercase"
            field={props.fields.PublishDate}
            render={(date) =>
              date?.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }
          />
          <Text tag="h2" className="news-title" field={props.fields.Title}></Text>
          <RichText tag="strong" field={props.fields.Excerpt} />
          <div>
            <RichText field={props.fields.Content} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default NewsDetail;
