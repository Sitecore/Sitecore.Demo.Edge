import Link from 'next/link';

const FeaturedProducts = (): JSX.Element => (
  <section className="section section--bg-white">
    <div className="section__content container">
      <h1 className="section__content__title section__content__title--light">Featured products</h1>
      <p className="section__content__subtitle--center">
        Road-test the world’s most trusted sports and fitness equipment–we’ll be welcoming 2,000
        brands at this year’s PLAY! Summit.
      </p>

      <div className="item-grid">
        <div className="grid-content">
          <Link href="/shop" passHref>
            <a className="grid-item">
              <img
                className="item-image-bordered item-image-h-40"
                src="/assets/img/shop/featured-watch.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Smart Watch</p>
                <p>Striva</p>
                <p>$450</p>
              </div>
            </a>
          </Link>

          <Link href="/shop" passHref>
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

          <Link href="/shop" passHref>
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

          <Link href="/shop" passHref>
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
                src="/assets/img/shop/center-top.jpeg"
                alt="Mountain"
              />
              <div className="item-details">
                <p className="item-title">Men&apos;s Biking Top</p>
                <p>Center Cycle</p>
                <p>$150</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
