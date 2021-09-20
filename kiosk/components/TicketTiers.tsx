import Link from 'next/link';

const TicketTiers = (): JSX.Element => {
  return (
    <div className="min-h-full bg-black flex justify-center items-center py-20">
      <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
        <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
          <h3 className="mb-3 text-xl font-bold text-indigo-600"> Digital Pass</h3>
          <div className="relative">
            <img
              className="w-full rounded-xl"
              src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt="Colors"
            />
            <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
              $99
            </p>
          </div>
          <h1 className="mt-4 text-gray-800 text-3xl font-bold cursor-pointer">Online Ticket</h1>
          <div className="my-4">
            <div className="flex space-x-1 items-center">
              <span></span>
              <p>1:34:23 Minutes</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span></span>
              <p>3 Parts</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span></span>
              <p>Vanilla JS</p>
            </div>
            <Link href="/payment">
              <button className="mt-4 btn--main btn--main--round">Buy Ticket</button>
            </Link>
          </div>
        </div>
        <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
          <h3 className="mb-3 text-xl font-bold text-indigo-600">Standard pass</h3>
          <div className="relative">
            <img
              className="w-full rounded-xl"
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
              alt="Colors"
            />
            <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
              $199
            </p>
            <p className="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg">
              %20 Discount
            </p>
          </div>
          <h1 className="mt-4 text-gray-800 text-3xl font-bold cursor-pointer">Regular Ticket</h1>
          <div className="my-4">
            <div className="flex space-x-1 items-center">
              <span></span>
              <p>1:34:23 Minutes</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span></span>
              <p>3 Parts</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span></span>
              <p>TypeScript</p>
            </div>
            <Link href="/payment">
              <button className="mt-4 btn--main btn--main--round">Buy Ticket</button>
            </Link>
          </div>
        </div>
        <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
          <h3 className="mb-3 text-xl font-bold text-indigo-600">All access VIP pass</h3>
          <div className="relative">
            <img
              className="w-full rounded-xl"
              src="https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
              alt="Colors"
            />
            <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
              $399
            </p>
          </div>
          <h1 className="mt-4 text-gray-800 text-3xl font-bold cursor-pointer">VIP Ticket</h1>
          <div className="my-4">
            <div className="flex space-x-1 items-center">
              <span></span>
              <p>1:34:23 Minutes</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span></span>
              <p>3 Parts</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span></span>
              <p>Vanilla JS</p>
            </div>
            <Link href="/payment">
              <button className="mt-4 btn--main btn--main--round">Buy Ticket</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketTiers;
