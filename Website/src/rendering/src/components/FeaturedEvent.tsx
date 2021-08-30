import Link from 'next/link';

const FeaturedEvent = (): JSX.Element => (
  <section className="section__featured__event">
    <div className="content">
      <div className="triangle-area">
        <div className="text-area">
          <h1 className="section-title">Featured Event</h1>
          <h3 className="event-title">STRIVA</h3>
          <h3 className="date-time">Mon, 24th | 9:00 AM</h3>
          <p className="event-subtitle">Train Smarter, Not Harder, John Johnson</p>
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
