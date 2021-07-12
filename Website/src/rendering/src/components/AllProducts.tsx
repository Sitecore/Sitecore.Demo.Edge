import Link from 'next/link';

const AllProducts = (): JSX.Element => (
  <div className="max-w-screen-2xl my-0 mx-auto box-border overflow-hidden">
    <h1 className="text-center uppercase text-blue py-10 text-3xl font-bold">All Products</h1>

    <div className="mx-auto gap-5 md:gap-10 w-2/3 grid grid-cols-1 md:grid-cols-5 pt-10">
      <span>Filter by:</span>
      <button
        type="button"
        className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        aria-label="featured"
      >
        Featured
        <img className="h-5" src="/assets/img/icons/down-arrow.svg" alt="^" />
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        aria-label="vendor"
      >
        Vendor
        <img className="h-5" src="/assets/img/icons/down-arrow.svg" alt="^" />
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        aria-label="category"
      >
        Category
        <img className="h-5" src="/assets/img/icons/down-arrow.svg" alt="^" />
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        aria-label="sport"
      >
        Sport
        <img className="h-5" src="/assets/img/icons/down-arrow.svg" alt="^" />
      </button>
    </div>

    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      <Link href="/shop" passHref>
        <div className="rounded overflow-hidden">
          <img
            className="md:w-full mx-auto border b-1 border-gray-dark h-40"
            src="/assets/img/shop/prod-alba-hydration-pack.jpeg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Hydration Pack</strong>
              <br />
              Alba
              <br />
              $129
            </p>
          </div>
        </div>
      </Link>

      <Link href="/shop" passHref>
        <div className="rounded overflow-hidden">
          <img
            className="md:w-full mx-auto border b-1 border-gray-dark h-40"
            src="/assets/img/shop/prod-centercycle-speed-track-helmet.jpeg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Speed Track Helmet</strong>
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
            src="/assets/img/shop/prod-centercycle-womens-biking-top.jpeg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Women&apos;s Biking Top</strong>
              <br />
              Center Cycle
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
            src="/assets/img/shop/prod-habitat-striva5.jpeg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Striva 5 Smart Watch</strong>
              <br />
              Striva
              <br />
              $349
            </p>
          </div>
        </div>
      </Link>
      <Link href="/shop" passHref>
        <div className="rounded overflow-hidden">
          <img
            className="md:w-full mx-auto border b-1 border-gray-dark h-40"
            src="/assets/img/shop/prod-striva-activity-tracker.jpeg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Striva 4 Smart Watch</strong>
              <br />
              <br />$
            </p>
          </div>
        </div>
      </Link>
      <Link href="/shop" passHref>
        <div className="rounded overflow-hidden">
          <img
            className="md:w-full mx-auto border b-1 border-gray-dark h-40"
            src="/assets/img/shop/speedsensor.jpeg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Cycling Speed Sensors</strong>
              <br />
              Striva
              <br />
              $37
            </p>
          </div>
        </div>
      </Link>
      <Link href="/shop" passHref>
        <div className="rounded overflow-hidden">
          <img
            className="md:w-full mx-auto border b-1 border-gray-dark h-40"
            src="/assets/img/shop/prod-striva-cycling-computer.jpeg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Cycling Computer</strong>
              <br />
              Striva
              <br />
              $189
            </p>
          </div>
        </div>
      </Link>
      <Link href="/shop" passHref>
        <div className="rounded overflow-hidden">
          <img
            className="md:w-full mx-auto border b-1 border-gray-dark h-40"
            src="/assets/img/shop/prod-centercycle-tire-repair-kit.jpeg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Tire Repair Kit</strong>
              <br />
              Center Cycle
              <br />
              $60
            </p>
          </div>
        </div>
      </Link>
      <Link href="/shop" passHref>
        <div className="rounded overflow-hidden">
          <img
            className="md:w-full mx-auto border b-1 border-gray-dark h-40"
            src="/assets/img/shop/prod-mens-biking-shorts.jpeg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Men&apos;s Biking Shorts</strong>
              <br />
              Center Cycle
              <br />
              $189
            </p>
          </div>
        </div>
      </Link>
      <Link href="/tickets" passHref>
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
      <Link href="/tickets" passHref>
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
      <Link href="/tickets" passHref>
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
            src="/assets/img/shop/prod-habitat-stationary-bike.jpg"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base text-center">
              <strong>Habitat Stationary Bike</strong>
              <br />
              Habitat
              <br />
              $1,500
            </p>
          </div>
        </div>
      </Link>
    </div>
  </div>
);

export default AllProducts;
