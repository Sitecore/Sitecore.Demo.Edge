import Link from 'next/link';
import { Text, Image, RichText, DateField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { News } from 'src/types/news';
import { newsDateFormatter } from '../../helpers/DateHelper';

type NewsListProps = ComponentProps & {
  fields: {
    items: News[];
  };
};

const NewsList = (props: NewsListProps): JSX.Element => {
  const newsCards =
    props.fields.items &&
    props.fields.items.map((news, index) => (
      <div key={index} className="news">
        <div className="image-container">
          <Image field={news.fields.Image} alt={news.fields.Title} width={340} height={227} />
        </div>
        <div className="text-container">
          <Text tag="div" className="news-title" field={news.fields.Title} />
          <DateField
            tag="p"
            className="news-date"
            field={news.fields.PublishDate}
            render={newsDateFormatter}
          />
          <RichText className="news-excerpt" field={news.fields.Excerpt} />
        </div>
        <div className="button-container">
          <Link href={news.url}>
            <a className="btn--main btn--main--round">Read&nbsp;More</a>
          </Link>
        </div>
      </div>
    ));

  return (
    <section className="section section__news--list">
      <div className="container">
        <div className="content">{newsCards}</div>
      </div>
    </section>
  );
};

export default NewsList;
