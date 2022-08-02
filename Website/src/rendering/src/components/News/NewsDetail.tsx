import {
  RichText,
  Text,
  Field,
  ImageField,
  Image,
  DateField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { newsDateFormatter } from '../../helpers/DateHelper';

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
  <section className="section news-detail">
    <div className="section-content left-content">
      <div className="container">
        <div className="left-column">
          <Image field={props.fields?.Image} alt={props.fields?.Title?.value} />
        </div>
        <div className="right-column">
          <DateField
            tag="h3"
            className="news-date"
            field={props.fields?.PublishDate}
            render={newsDateFormatter}
          />
          <Text tag="h2" className="news-title" field={props.fields?.Title} />
          <RichText tag="div" className="news-excerpt rich-text" field={props.fields?.Excerpt} />
          <div>
            <RichText className="rich-text" field={props.fields?.Content} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default NewsDetail;
