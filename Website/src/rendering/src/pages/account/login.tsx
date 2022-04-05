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

  const [isLogin, setIsLogin] = useState(true);

  const loginForm = isLogin && (
    <form>
      <div className="form-group">
        <FontAwesomeIcon className="user-icon" icon={faUserCircle} />
        <input id="username-input" type="text" placeholder="Username or email..." />
      </div>
      <div className="form-group">
        <FontAwesomeIcon className="lock-icon" icon={faLock} />
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
        <ul>
          {loginProviders.map((provider) => {
            return (
              <li className="login-provider" key={provider.name}>
                <span>{provider.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </form>
  );

  const signupForm = !isLogin && (
    <form>
      <div className="form-group">
        <FontAwesomeIcon className="user-icon" icon={faUserCircle} />
        <input id="name-input" type="text" placeholder="Your name.." />
      </div>
      <div className="form-group">
        <FontAwesomeIcon className="envelope-icon" icon={faEnvelope} />
        <input id="email-input" type="email" placeholder="Your email.." />
      </div>
      <div className="form-group">
        <FontAwesomeIcon className="lock-icon" icon={faLock} />
        <input id="password-input" type="password" placeholder="Your password.." />
      </div>
      <div className="form-group">
        <FontAwesomeIcon className="lock-icon" icon={faLock} />
        <input id="confirm-password-input" type="password" placeholder="Confirm your password.." />
      </div>
      <div className="personalized-offers-container">
        <input type="checkbox" id="personal-offers" name="personal-offers" defaultChecked />
        <label htmlFor="personal-offers">Yes, I would like to receive personalized offers.</label>
      </div>
      <button type="submit" className="signup-btn">
        Sign up
      </button>
    </form>
  );

  return (
    <div className="account-page-container">
      <Head>
        <title>PLAY! Shop - Login</title>
      </Head>
      <div className="account-page-container-content">
        <Link href="/shop">
          <a className="logo-link">
            <Image field={logoLink} alt="Logo image" />
          </a>
        </Link>
        <div className="tabs-container">
          <button className={isLogin && 'active'} onClick={() => setIsLogin(true)}>
            Log in
          </button>
          <button className={!isLogin && 'active'} onClick={() => setIsLogin(false)}>
            Sign up
          </button>
        </div>
        <div className="form-container">
          {loginForm}
          {signupForm}
        </div>
      </div>
    </div>
  );
};

export default Login;
