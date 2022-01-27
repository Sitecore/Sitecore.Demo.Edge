import Link from 'next/link';

const FullImageCTASection = (): JSX.Element => (
  <section className="section section__full-image section__full-image--map">
    <div className="section__content section__full-image__content section__full-image__content--center">
      <Link href="/map">
        <a className="btn--main btn--main--square">Venue Map</a>
      </Link>
    </div>
  </section>
);

export default FullImageCTASection;
