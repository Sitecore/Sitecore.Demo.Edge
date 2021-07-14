import Link from 'next/link';
import React, { useState } from 'react';

const MainNavigation = (): JSX.Element => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="bg-black" style={{ height: '92px' }}>
      <div className="w-full lg:container lg:mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full flex justify-between lg:w-auto lg:static lg:block lg:justify-start px-6">
          <a
            className="text-sm font-bold leading-relaxed inline-block py-4 whitespace-nowrap uppercase text-white"
            href="/"
          >
            <img
              src="/assets/img/play-logo-stacked-light.svg"
              alt="PLAY! Summit logo"
              style={{ height: '46px' }}
            />
          </a>
          <button
            className="text-white cursor-pointer text-xl leading-none border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none w-8"
            aria-label="open menu"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={
            'lg:flex flex-grow bg-black-light lg:bg-transparent px-4 pb-5 lg:pb-0' +
            (navbarOpen ? ' flex' : ' hidden')
          }
        >
          <ul className="flex flex-col lg:flex-row lg:items-center list-none lg:ml-auto">
            <li>
              <Link href="/schedule">
                <a className="px-3 py-2 text-base leading-loose text-white hover:text-yellow">
                  Schedule
                </a>
              </Link>
            </li>
            <li>
              <Link href="/speakers">
                <a className="px-3 py-2 text-base leading-loose text-white hover:text-yellow">
                  Speakers
                </a>
              </Link>
            </li>
            <li>
              <Link href="/vendors">
                <a className="px-3 py-2 text-base leading-loose text-white hover:text-yellow">
                  Vendors
                </a>
              </Link>
            </li>
            <li>
              <Link href="/aboutus">
                <a className="px-3 py-2 text-base leading-loose text-white hover:text-yellow">
                  About Us
                </a>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <a className="px-3 py-2 text-base leading-loose text-white hover:text-yellow">
                  Shop
                </a>
              </Link>
            </li>
            <li>
              <Link href="/tickets">
                <a className="btn--main btn--main--round inline-block text-black">Book Tickets</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
