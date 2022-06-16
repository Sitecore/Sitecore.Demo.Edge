import Link from 'next/link';

const FullImageCTASection = (): JSX.Element => (
  <section className="section full-image-section full-image-section-map">
    <div className="section-content full-image-section-content full-image-section-content--center">
      <Link href="/map">
        <a className="btn-square">Venue Map</a>
      </Link>
    </div>
  </section>
);

export default FullImageCTASection;
