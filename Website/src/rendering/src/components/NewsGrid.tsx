<<<<<<< feature/6330-remove-disconnected
import profile from '../../public/assets/img/news/profile-pic.jpg';
import Link from 'next/link';
import { Field, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type News = {
  name: Field<string>;
  fields: {
    Title: Field<string>;
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
      <div className="grid grid-cols-2 gap-2.5 h-full">
        {props.fields.items &&
          props.fields.items.map((news, index) => (
            <Link key={index} href={'/news/' + news.name} passHref>
              <a className="section__news__grid__news__item">{news.fields.Title.value}</a>
            </Link>
          ))}
      </div>
    </div>
  </div>
);

export type { News };
export default NewsGrid;
