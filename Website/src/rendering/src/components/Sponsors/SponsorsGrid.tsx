import Link from 'next/link';
import { withDatasourceCheck, Image, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Sponsor } from 'src/types/sponsor';

type SponsorsGridProps = ComponentProps & {
  fields: {
    items: Sponsor[];
  };
};

const SponsorsGrid = (props: SponsorsGridProps): JSX.Element => {
  const sponsors =
    props.fields.items &&
    props.fields.items.map((sponsor, index) => (
      <Link key={index} href={sponsor.url} passHref>
        <a className="grid-item">
          <Image
            field={sponsor.fields.Logo}
            alt={sponsor.fields.Name.value}
            width={265}
            height={265}
          />
          <div className="item-details">
            <Text tag="p" field={sponsor.fields.Name} />
          </div>
        </a>
      </Link>
    ));

  return (
    <section className="section">
      <div className="section__content container">
        <h1 className="section__content__title">Explore Sponsors</h1>
        <div className="item-grid">
          <div className="grid-filters">
            <span>Filter by</span>
            <button
              type="button"
              className="dropdown-filter"
              id="menu-button-schedule"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="schedule"
            >
              Schedule
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="dropdown-filter"
              id="menu-button-speakers"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="speakers"
            >
              Speakers
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="dropdown-filter"
              id="menu-button-category"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="category"
            >
              Category
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="dropdown-filter"
              id="menu-button-sport"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="sport"
            >
              Sport
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
          </div>

          <div className="grid-content">{sponsors}</div>
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<SponsorsGridProps>(SponsorsGrid);
