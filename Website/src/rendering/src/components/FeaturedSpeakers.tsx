import Link from 'next/link';

const FeaturedSpeakers = (): JSX.Element => (
  <section className="">
    <div className="max-w-screen-2xl mx-auto box-border overflow-hidden bg-white">
      <h1 className="text-center uppercase text-blue pt-10 text-4xl font-semibold">
        Featured Speakers
      </h1>
      <p className="text-center">
        Road-test the world’s most trusted sports and fitnessequipment–we’ll be welcoming 2,000
        brands at this year’s PLAY! Summit.
      </p>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <Link href="/speakers/mary-asada" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/speakers/mary-asada.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Mary Asada</p>
            </div>
          </div>
        </Link>

        <Link href="/speakers/jacobgonzalez" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/speakers/martin-moore.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Jacob Gonzalez</p>
            </div>
          </div>
        </Link>

        <Link href="/speakers/edjones" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/speakers/ed-jones.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Ed Jones</p>
            </div>
          </div>
        </Link>

        <Link href="/speakers/sophiataylor" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/speakers/sophia-taylor.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Sophia Taylor</p>
            </div>
          </div>
        </Link>

        <Link href="/speakers/lixiuying" passHref>
          <div className="rounded overflow-hidden">
            <img
              className="w-full border b-1 border-white-dark"
              src="/data/media/img/speakers/li-xiu-ying.jpeg"
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base text-center">Li Xiu Ying</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedSpeakers;
