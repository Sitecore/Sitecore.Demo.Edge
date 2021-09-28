import profile from '../../public/assets/img/news/profile-pic.jpg';
import Link from 'next/link';
import { Field, Image, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type News = {
  name: Field<string>;
  fields: {
    Title: Field<string>;
    Image: ImageField;
    PublishDate: Field<string>;
  };
};

type NewsGridProps = ComponentProps & {
  fields: {
    items: News[];
  };
};

const NewsGrid = (props: NewsGridProps): JSX.Element => (
  <div className="section__news__grid">
    <div className="section__news__grid__tweet">
      <img
        src="/assets/img/news/conference-image.jpg"
        alt="News"
        width="100%"
        className="section__news__grid__tweet__img"
      />
      <div className="section__news__grid__tweet__content">
        <div className="section__news__grid__tweet__content__profile">
          <Image
            src={profile}
            alt="News"
            width="60px"
            className="section__news__grid__tweet__content__profile__pic"
          />
          <div className="section__news__grid__tweet__content__profile__content">
            <p>John Doe - @jdoe</p>
            <p>2h ago</p>
          </div>
        </div>
        <p className="section__news__grid__tweet__content__tweet">
          Hyped for this year&apos;s edition of Play! Summit
        </p>
        <p className="section__news__grid__tweet__content__link">#play! #sports</p>
        <p className="section__news__grid__tweet__content__comments">View all 50 comments</p>
      </div>
    </div>
    <div className="section__news__grid__news">
      <div className="section__news__grid__news__grid">
        {props.fields.items &&
          props.fields.items
            .sort((a, b) => a.fields.PublishDate.value.localeCompare(b.fields.PublishDate.value))
            .reverse()
            .slice(0, 4)
            .map((news, index) => (
              <div
                key={index}
                className="section__news__grid__news__item"
                style={{ backgroundImage: 'url(' + news.fields.Image.value?.src + ')' }}
              >
                <Link href={'/news/' + news.name} passHref>
                  <a>{news.fields.Title.value}</a>
                </Link>
              </div>
            ))}
      </div>
    </div>
  </div>
);

export type { News };
export default NewsGrid;
