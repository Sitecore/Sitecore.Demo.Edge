import Link from 'next/link';

const FeaturedEvent = (): JSX.Element => (
  <section className="section__featured__event mt-20 banner bg-black bg-left bg-no-repeat bg-cover relative">
    <div className="px-14 max-w-screen-2xl flex items-center justify-end w-full my-0 mx-auto box-border overflow-hidden">
      <div className="triangle max-w-30 relative shadow-xl w-full bg-black-light">
        <div className="p-14">
          <h1 className="text-2xl text-yellow font-semibold">Featured Event</h1>
          <h3 className="text-5xl font-semibold text-white uppercase m-0">STRIVA</h3>
          <h3 className="text-2xl text-yellow font-semibold">Mon, 24th | 9:00 AM</h3>
          <p className="text-1xl text-white">Train Smarter, Not Harder, John Johnson</p>
        </div>
        <div className="btn__area">
          <Link href="/tickets">
            <a className="btn--main btn--main--round btn--main--big">Add to calendar</a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturedEvent;
