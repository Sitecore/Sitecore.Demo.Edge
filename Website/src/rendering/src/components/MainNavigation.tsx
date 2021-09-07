import Link from 'next/link';
import React, { useState } from 'react';

const MainNavigation = (): JSX.Element => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="main-navigation">
      <div className="navigation-content">
        <div className="controls-container">
          <Link href="/">
            <a className="logo-link">
              <img src="/assets/img/play-logo-stacked-light.svg" alt="PLAY! Summit logo" />
            </a>
          </Link>
          <button
            className="items-toggle"
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
        <div className={'items-container' + (navbarOpen ? ' opened' : ' closed')}>
          <ul>
            <li className="text-menu-item">
              <Link href="/sessions">
                <a>Sessions</a>
              </Link>
            </li>
            <li className="text-menu-item">
              <Link href="/speakers">
                <a>Speakers</a>
              </Link>
            </li>
            <li className="text-menu-item">
              <Link href="/vendors">
                <a>Vendors</a>
              </Link>
            </li>
            <li className="text-menu-item">
              <Link href="/aboutus">
                <a>About Us</a>
              </Link>
            </li>
            <li className="text-menu-item">
              <Link href="/shop">
                <a>Shop</a>
              </Link>
            </li>
            <li className="button-menu-item">
              <Link href="/tickets">
                <a className="btn--main btn--main--round">Book Tickets</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
