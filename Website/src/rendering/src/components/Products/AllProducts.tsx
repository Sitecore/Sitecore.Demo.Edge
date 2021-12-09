import Link from 'next/link';

const AllProducts = (): JSX.Element => (
  <section className="section section__allproducts">
    <div className="section__content container">
      <h1 className="section__content__title section__content__title--light">All Products</h1>
      <div className="item-grid">
        <div className="grid-filters">
          <span>Filter by:</span>
          <button
            type="button"
            className="dropdown-filter"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            aria-label="featured"
          >
            Featured
            <img src="/assets/img/icons/down-arrow.svg" alt="^" />
          </button>
          <button
            type="button"
            className="dropdown-filter"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            aria-label="vendor"
          >
            Vendor
            <img src="/assets/img/icons/down-arrow.svg" alt="^" />
          </button>
          <button
            type="button"
            className="dropdown-filter"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            aria-label="category"
          >
            Category
            <img src="/assets/img/icons/down-arrow.svg" alt="^" />
          </button>
          <button
            type="button"
            className="dropdown-filter"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            aria-label="sport"
          >
            Sport
            <img src="/assets/img/icons/down-arrow.svg" alt="^" />
          </button>
        </div>

        <div className="grid-content">
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/prod-alba-hydration-pack.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Hydration Pack</p>
                <p>Alba</p>
                <p>$129</p>
              </div>
            </a>
          </Link>

          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/prod-centercycle-speed-track-helmet.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Speed Track Helmet</p>
                <p>Center Cycle</p>
                <p>$89</p>
              </div>
            </a>
          </Link>
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/prod-centercycle-womens-biking-top.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Women&apos;s Biking Top</p>
                <p>Center Cycle</p>
                <p>$150</p>
              </div>
            </a>
          </Link>
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/prod-habitat-striva5.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Striva 5 Smart Watch</p>
                <p>Striva</p>
                <p>$349</p>
              </div>
            </a>
          </Link>
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/prod-striva-activity-tracker.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Striva 4 Smart Watch</p>
                <p>Striva</p>
                <p>$129</p>
              </div>
            </a>
          </Link>
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/speedsensor.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Cycling Speed Sensors</p>
                <p>Striva</p>
                <p>$37</p>
              </div>
            </a>
          </Link>
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/prod-striva-cycling-computer.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Cycling Computer</p>
                <p>Striva</p>
                <p>$189</p>
              </div>
            </a>
          </Link>
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/prod-centercycle-tire-repair-kit.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Tire Repair Kit</p>
                <p>Center Cycle</p>
                <p>$60</p>
              </div>
            </a>
          </Link>
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/prod-mens-biking-shorts.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Men&apos;s Biking Shorts</p>
                <p>Center Cycle</p>
                <p>$189</p>
              </div>
            </a>
          </Link>
          <Link href="/tickets" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/helmet.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Speed Biking Helmet</p>
                <p>Center Cycle</p>
                <p>$89</p>
              </div>
            </a>
          </Link>
          <Link href="/tickets" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/featured-shoe.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Race Bike Shoes</p>
                <p>Prostaff</p>
                <p>$150</p>
              </div>
            </a>
          </Link>
          <Link href="/tickets" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/luxe-bike.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Luxe Mountain Bike</p>
                <p>Dwell</p>
                <p>$550</p>
              </div>
            </a>
          </Link>
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/prod-habitat-stationary-bike.jpg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Habitat Stationary Bike</p>
                <p>Habitat</p>
                <p>$1,500</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default AllProducts;
