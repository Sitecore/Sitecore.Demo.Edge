import Link from 'next/link';

const VendorsGrid = (): JSX.Element => (
  <section>
    <div className="max-w-screen-2xl mx-auto box-border overflow-hidden">
      <div className="mx-auto gap-10 w-2/3 grid grid-flow-col grid-cols-5 pt-10">
        <span>Filter by</span>
        <button
          type="button"
          className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          aria-label="scheduled"
        >
          Schedule
          <img className="h-5" src="/assets/img/icons/down-arrow.svg" alt="^" />
        </button>
        <button
          type="button"
          className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          aria-label="speakers"
        >
          Speakers
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

      <h1 className="text-center uppercase text-blue pt-10 text-4xl font-semibold">
        All event vendors
      </h1>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <Link href="/tickets" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/Outrace.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Outrace</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/RunRightThrough.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Run Right Through</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/OnTheGreen.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">On The Green</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/RobinFitness.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Robin</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/Gameday.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Gameday</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/Dwell.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Dwell</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/OverUnder.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Over Under</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/Alba.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Alba</p>
            </div>
          </div>
        </Link>

        <Link href="/vendors/striva" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/Striva.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Striva</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/vendors/ProStaff.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Pro Staff</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default VendorsGrid;
