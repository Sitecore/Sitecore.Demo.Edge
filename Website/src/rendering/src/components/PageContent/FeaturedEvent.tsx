import Link from 'next/link';

const FeaturedEvent = (): JSX.Element => (
  <section className="featured-event">
    <div className="content">
      <div className="triangle-area">
        <div className="text-area">
          <h1 className="section-title">Featured Event</h1>
          <h3 className="event-title">Guest Keynote</h3>
          <p className="section-title">Chris Williams</p>
          <p className="event-subtitle">Professional Cyclist</p>
        </div>
        <div className="btn-area">
          <Link href="/tickets">
            <a className="btn-main">Book Tickets</a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturedEvent;
