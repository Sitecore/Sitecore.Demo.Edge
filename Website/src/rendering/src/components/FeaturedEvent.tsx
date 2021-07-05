import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';

type FeaturedEventProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const FeaturedEvent = (props: FeaturedEventProps): JSX.Element => (
  <section className="section__featured__event banner">
    <div className="section__featured__event__container">
      <div className="section__featured__event__container__content">
        <div className="section__featured__event__container__content__text">
          <Text field={props.fields.heading} />
          <h1 className="banner__title__sub-title">Featured Event</h1>
          <h3 className="banner__title__title">STRIVA</h3>
          <h3 className="banner__title__sub-title">Mon, 24th | 9:00 AM</h3>
          <p className="banner__title__p">
            Train Smarter, Not Harder, John Johnson
          </p>
        </div>
        <div className="btn__area">
          <Link href="/tickets">
            <a className="btn--main btn--main--round btn--main--big">Add to calendar</a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturedEvent;
