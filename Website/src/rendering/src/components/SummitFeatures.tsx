import Link from 'next/link';

const SummitFeatures = (): JSX.Element => (
  <div className="grid grid-cols-4 gap-10">
    <div className="">
      <img className="h-40" src="/assets/img/aboutus/Play-Summit-Speaking-Hall2.jpg" alt="expo" />
      <h2>The Expo</h2>
      <p>
        This year’s theme is ‘Raise Your Game’ –join us over two days for a global gathering of
        brands, sports professionals,and innovators.
      </p>
    </div>
    <div className="item item--2">
      <img className="h-40" src="/assets/img/aboutus/fitbit-logo.png" alt="Speakers" />
      <h2>Leading brands</h2>
      <p>
        Avail of exclusive discounts or road-test the latest sports equipment in our Exhibition
        Hall, where you can explore 300 + leading sports brands.
      </p>
    </div>
    <div className="item item--3">
      <img
        className="h-40"
        src="/assets/img/aboutus/crowds-people-at-cycling-exhibition-BKK44X.jpeg"
        alt="Vendors"
      />
      <h2>Workshops</h2>
      <p>
        From transforming your mindset to improving your technique, learn practical tips from our
        line-up of experts.
      </p>
    </div>
    <div className="item item--3">
      <img className="h-40" src="/assets/img/aboutus/P1220073.jpeg" alt="Vendors" />
      <h2>Speakers</h2>
      <p>
        Sign up for a session and hear exclusive insights from 90+ globally recognized sports stars,
        athletes, and fitness experts.
      </p>
    </div>
  </div>
);

export default SummitFeatures;
