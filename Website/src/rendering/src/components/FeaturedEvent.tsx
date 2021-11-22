import Link from 'next/link';

const FeaturedEvent = (): JSX.Element => (
  <section className="section__featured__event">
    <div className="content">
      <div className="triangle-area">
        <div className="text-area">
          <h1 className="section-title">Featured Event</h1>
          <h3 className="event-title">Train Smarter - Not Harder</h3>
          <p className="event-subtitle">Guest speaker: Andre Favreau</p>
        </div>
        <div className="btn__area">
          <Link href="/tickets">
            <a className="btn--main btn--main--round btn--main--big">Book Tickets</a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturedEvent;
