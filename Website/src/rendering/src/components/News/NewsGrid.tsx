import profile from '../../../public/assets/img/news/profile-pic.jpg';
import Link from 'next/link';
import { Image, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { News } from 'src/types/news';

type NewsGridProps = ComponentProps & {
  fields: {
    items: News[];
  };
};

const NewsGrid = (props: NewsGridProps): JSX.Element => {
  const newsCards =
    props.fields.items &&
    props.fields.items
      .sort((a, b) => a.fields.PublishDate.value.localeCompare(b.fields.PublishDate.value))
      .reverse()
      .slice(0, 4)
      .map((news, index) => (
        <div key={index} className="section__news__grid__news__item">
          <Link href={news.url} passHref>
            <a>
              <img
                className="section__news__grid__news__image"
                src={news.fields.Image?.value?.src}
                alt="News"
                width="465px"
                height="260px"
                loading="lazy"
              />
              {news.fields.Title?.value}
            </a>
          </Link>
        </div>
      ));

  return (
    <div className="section__news__grid">
      <div className="section__news__grid__tweet">
        <img
          src="/assets/img/news/conference-image.jpg"
          alt="News"
          width="465px"
          height="388px"
          className="section__news__grid__tweet__img"
          loading="lazy"
        />
        <div className="section__news__grid__tweet__content">
          <div className="section__news__grid__tweet__content__profile">
            <Image
              src={profile}
              alt="News"
              width="60px"
              className="section__news__grid__tweet__content__profile__pic"
              loading="lazy"
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
        <div className="section__news__grid__news__grid">{newsCards}</div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<NewsGridProps>(NewsGrid);
