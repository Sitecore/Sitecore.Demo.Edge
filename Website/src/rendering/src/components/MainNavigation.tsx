import Link from 'next/link';
import React, { useState } from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type MainNavigationProps = ComponentProps & {
  fields: {
    data: {
      item: {
        headerLogo: {
          jsonValue: ImageField;
          alt: string;
        };
      };
    };
  };
};

const MainNavigation = (props: MainNavigationProps): JSX.Element => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="main-navigation">
      <div className="navigation-content">
        <div className="controls-container">
          <Link href="/">
            <a className="logo-link">
              <Image
                field={props.fields.data.item.headerLogo.jsonValue}
                alt={props.fields.data.item.headerLogo.alt}
              />
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
              <Link href="/about-us">
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
