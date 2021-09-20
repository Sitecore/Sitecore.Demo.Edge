import Link from 'next/link';
import Image from 'next/image';
type TicketProps = {
  pass: string;
  thumbnail: string;
  price: string;
  name: string;
};

const Ticket = (props: TicketProps): JSX.Element => {
  return (
    <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h3 className="mb-3 text-xl font-bold text-indigo-600">{props.pass}</h3>
      <div className="relative">
        <Image
          width="286"
          height="192"
          className="w-full rounded-xl"
          src={props.thumbnail}
          alt="Thumbnail"
        />
        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
          {props.price}
        </p>
      </div>
      <h1 className="mt-4 text-gray-800 text-3xl font-bold cursor-pointer">{props.name}</h1>
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
        <Link href="/payment" passHref>
          <button className="mt-4 btn--main btn--main--round">Buy Ticket</button>
        </Link>
        <span> or </span>
        <Link href="/signup" passHref>
          <button className="underline">stay tuned</button>
        </Link>
      </div>
    </div>
  );
};

export default Ticket;
