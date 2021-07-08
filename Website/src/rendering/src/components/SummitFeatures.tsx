const SummitFeatures = (): JSX.Element => (
  <div className="grid grid-cols-4 gap-3 pt-10">
    <div>
      <img className="h-40" src="/assets/img/aboutus/Play-Summit-Speaking-Hall2.jpg" alt="expo" />
      <div className="bg-gray-light p-5">
        <strong>The Expo</strong>
        <p className="text-sm pt-5">
          This year’s theme is ‘Raise Your Game’ –join us over two days for a global gathering of
          brands, sports professionals,and innovators.
        </p>
      </div>
    </div>
    <div className="item item--2">
      <img className="h-40" src="/assets/img/aboutus/fitbit-logo.png" alt="Speakers" />
      <div className="bg-gray-light p-5">
        <strong>Leading brands</strong>
        <p className="text-sm pt-5">
          Avail of exclusive discounts or road-test the latest sports equipment in our Exhibition
          Hall, where you can explore 300 + leading sports brands.
        </p>
      </div>
    </div>{' '}
    <div className="item item--3">
      <img
        className="h-40"
        src="/assets/img/aboutus/crowds-people-at-cycling-exhibition-BKK44X.jpeg"
        alt="Vendors"
      />
      <div className="bg-gray-light p-5">
        <strong>Workshops</strong>
        <p className="text-sm pt-5">
          From transforming your mindset to improving your technique, learn practical tips from our
          line-up of experts. <br />
          <br />
        </p>
      </div>{' '}
    </div>
    <div className="item item--3">
      <img className="h-40" src="/assets/img/aboutus/P1220073.jpeg" alt="Vendors" />
      <div className="bg-gray-light p-5">
        <strong>Speakers</strong>
        <p className="text-sm pt-5">
          Sign up for a session and hear exclusive insights from 90+ globally recognized sports
          stars, athletes, and fitness experts.
          <br />
          <br />
        </p>
      </div>{' '}
    </div>
  </div>
);

export default SummitFeatures;
