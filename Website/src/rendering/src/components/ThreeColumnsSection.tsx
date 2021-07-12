import Link from 'next/link';
import Image from 'next/image';

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
          <Image
            src="/assets/img/headline-icon-schedule.svg"
            alt="Schedule"
            width={179}
            height={150}
          />
          <p>48 Talks and Workshops</p>
          <Link href="/schedule">View Schedule &gt;</Link>
        </div>
        <div className="item item--2">
          <Image
            src="/assets/img/headline-icon-speakers.svg"
            alt="Speakers"
            width={179}
            height={150}
          />
          <p>32 Speakers and Guest Speakers</p>
          <Link href="/speakers">View Speakers &gt;</Link>
        </div>
        <div className="item item--3">
          <Image
            src="/assets/img/headline-icon-vendors.svg"
            alt="Vendors"
            width={179}
            height={150}
          />
          <p>60 Vendors with VIP Products</p>
          <Link href="/vendors">View Vendors &gt;</Link>
        </div>
      </div>
    </div>
  </section>
);

export default ThreeColumnsSection;
