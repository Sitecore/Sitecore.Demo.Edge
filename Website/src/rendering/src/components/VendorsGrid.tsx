import Link from 'next/link';

const VendorsGrid = (): JSX.Element => (
  <section>
    <div className="max-w-screen-2xl mx-auto box-border overflow-hidden">
      <h1 className="text-center uppercase text-blue-light pt-10 text-4xl font-semibold">
        All event vendors
      </h1>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/Outrace.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Outrace</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/RunRightThrough.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Run Right Through</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/OnTheGreen.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">On The Green</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/RobinFitness.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Robin</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/Gameday.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Gameday</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/Dwell.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Dwell</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/OverUnder.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Over Under</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/Alba.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Alba</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/Striva.jpg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Striva</p>
            </div>
          </div>
        </Link>

        <Link href="/tickets">
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/assets/img/vendors/ProStaff.jpg"
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
