import Link from 'next/link';
import { Text, Image, RichText, DateField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { News } from '../types/news';

type NewsListProps = ComponentProps & {
  fields: {
    items: News[];
  };
};

const NewsList = (props: NewsListProps): JSX.Element => (
  <section className="section section__news--list">
    <div className="container">
      <div className="content">
        {props.fields.items &&
          props.fields.items.map((news, index) => (
            <div key={index} className="news">
              <Image field={news.fields.Image} alt={news.fields.Title} width={340} height={227} />
              <div className="text-container">
                <Text tag="div" className="news-title" field={news.fields.Title}></Text>
                <DateField
                  tag="p"
                  className="news-date"
                  field={news.fields.PublishDate}
                  render={(date) =>
                    date?.toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }
                />
                <RichText tag="p" className="news-excerpt" field={news.fields.Excerpt}></RichText>
              </div>
              <div className="button-container">
                <Link href={'/news/' + news.name}>
                  <a className="btn--main btn--main--round">Read&nbsp;More</a>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  </section>
);

export type { News };
export default NewsList;
