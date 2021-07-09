import Link from 'next/link';

const FeaturedProducts = (): JSX.Element => (
  <section className="">
    <div className="max-w-screen-2xl mx-auto box-border overflow-hidden bg-white">
      <h1 className="text-center uppercase text-blue pt-10 text-4xl font-semibold">
        Featured products
      </h1>
      <p className="text-center">
        Road-test the world’s most trusted sports and fitness equipment–we’ll be welcoming 2,000
        brands at this year’s PLAY! Summit.
      </p>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <Link href="/shop" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="md:w-full mx-auto border b-1 border-gray-dark h-40"
              src="/assets/img/shop/featured-watch.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">
                <strong>Smart Watch</strong>
                <br />
                Striva
                <br />
                $450
              </p>
            </div>
          </div>
        </Link>

        <Link href="/shop" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="md:w-full mx-auto border b-1 border-gray-dark h-40"
              src="/assets/img/shop/featured-shoe.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">
                <strong>Race Bike Shoes</strong>
                <br />
                Prostaff
                <br />
                $150
              </p>
            </div>
          </div>
        </Link>

        <Link href="/shop" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="md:w-full mx-auto border b-1 border-gray-dark h-40"
              src="/assets/img/shop/helmet.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">
                <strong>Speed Biking Helmet</strong>
                <br />
                Center Cycle
                <br />
                $89
              </p>
            </div>
          </div>
        </Link>

        <Link href="/shop" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="md:w-full mx-auto border b-1 border-gray-dark h-40"
              src="/assets/img/shop/luxe-bike.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">
                <strong>Luxe Mountain Bike</strong>
                <br />
                Dwell
                <br />
                $550
              </p>
            </div>
          </div>
        </Link>

        <Link href="/shop" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="md:w-full mx-auto border b-1 border-gray-dark h-40"
              src="/assets/img/shop/center-top.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">
                <strong>Men&apos;s Biking Top</strong>
                <br />
                Center Cycle
                <br />
                $150
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
