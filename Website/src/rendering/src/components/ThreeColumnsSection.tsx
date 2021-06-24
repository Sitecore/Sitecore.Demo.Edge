const ThreeColumnsSection = (): JSX.Element => (
  <section className="section section--3-col">
    <div className="section__content section--3-col__content">
      <h2 className="section__content__title section__content__title--light">Go the Distance</h2>
      <p className="section__content__p">
        Whether you’re joining us in person or online, this year’s PLAY! Summit is set to be our
        biggest and best event yet. Look forward to an action-packed line-up featuring keynotes,
        Q&amp;As, demos, and workshops across a mix of live and virtual stages.
      </p>
      <div className="section--3-col__content__items">
        <div className="item item--1">
          <img src="/assets/img/headline-icon-schedule.svg" alt="Schedule" />
          <p>48 Talks and Workshops</p>
          <a href="/schedule">View Schedule &gt;</a>
        </div>
        <div className="item item--2">
          <img src="/assets/img/headline-icon-speakers.svg" alt="Speakers" />
          <p>32 Speakers and Guest Speakers</p>
          <a href="/speakers">View Speakers &gt;</a>
        </div>
        <div className="item item--3">
          <img src="/assets/img/headline-icon-vendors.svg" alt="Vendors" />
          <p>60 Vendors with VIP Products</p>
          <a href="/vendors">View Vendors &gt;</a>
        </div>
      </div>
    </div>
  </section>
);

export default ThreeColumnsSection;
