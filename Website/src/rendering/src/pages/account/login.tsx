import Head from 'next/head';
import Link from 'next/link';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

type LoginProvider = {
  name: string;
  url: string;
};

const Login = (): JSX.Element => {
  const logoLink: ImageField = {
    value: {
      src: '/assets/img/play-shop-logo.svg',
    },
  };
  const loginProviders: LoginProvider[] = [
    {
      name: 'Google',
      url: '',
    },
    {
      name: 'Microsoft',
      url: '',
    },
    {
      name: 'Apple',
      url: '',
    },
    {
      name: 'GitHub',
      url: '',
    },
  ];

  const [selectedTab, setSelectedTab] = useState('login');
  const handleTabClick = (tab: string) => {
    return tab === 'login' ? setSelectedTab('login') : setSelectedTab('signup');
  };

  return (
    <>
      <div className="account-page-container">
        <Head>
          <title>PLAY! Shop - Login</title>
        </Head>
        <Link href="/shop">
          <a className="logo-link">
            <Image field={logoLink} alt="Logo image" />
          </a>
        </Link>
        <div className="tabs-container">
          <button
            className={`login-tab ${selectedTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabClick('login')}
          >
            Log in
          </button>
          <button
            className={`signup-tab ${selectedTab === 'signup' ? 'active' : ''}`}
            onClick={() => handleTabClick('signup')}
          >
            Sign up
          </button>
          <div
            className={`arrow-down-container ${
              selectedTab === 'login' ? 'login-tab-active' : 'signup-tab-active'
            }`}
          >
            <div className="arrow-down"></div>
          </div>
        </div>
        {selectedTab === 'login' ? (
          <div className="login-form-container">
            <form>
              <div className="login-username">
                <FontAwesomeIcon id="user-icon" icon={faUserCircle} />
                <input id="username-input" type="text" placeholder="Username or email..." />
              </div>
              <div className="login-password">
                <FontAwesomeIcon id="lock-icon" icon={faLock} />
                <input id="password-input" type="password" placeholder="Password..." />
              </div>
              <button type="submit" className="login-btn">
                Sign in
              </button>
              <Link href="/account/password-reset">
                <a className="reset-password-link">Forgot password?</a>
              </Link>
              <div className="login-providers-container">
                <p>Or sign in with:</p>
                {loginProviders.map((provider) => {
                  return (
                    <div className="login-provider" key={provider.name}>
                      <span>{provider.name}</span>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        ) : (
          <div className="signup-form-container">
            <form>
              <div className="signup-name">
                <FontAwesomeIcon id="user-icon" icon={faUserCircle} />
                <input id="name-input" type="text" placeholder="Your name.." />
              </div>
              <div className="signup-email">
                <FontAwesomeIcon id="envelope-icon" icon={faEnvelope} />
                <input id="email-input" type="email" placeholder="Your email.." />
              </div>
              <div className="signup-password">
                <FontAwesomeIcon id="lock-icon" icon={faLock} />
                <input id="password-input" type="password" placeholder="Your password.." />
              </div>
              <div className="signup-confirm-password">
                <FontAwesomeIcon id="lock-icon" icon={faLock} />
                <input
                  id="confirm-password-input"
                  type="password"
                  placeholder="Confirm your password.."
                />
              </div>
              <div className="personalized-offers-container">
                <input type="checkbox" defaultChecked />
                <span>Yes, I would like to receive personalized offers.</span>
              </div>
              <button type="submit" className="signup-btn">
                Sign up
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
