import Head from 'next/head';
import Link from 'next/link';
import Header, { HeaderProps } from 'components/Navigation/Header';
import MainNavigation, { MainNavigationProps } from 'components/Navigation/MainNavigation';
import Footer, { FooterProps } from 'components/Navigation/Footer';

const QuickCheckout = (): JSX.Element => {
  const headerProps = {
    rendering: {
      placeholders: {
        'jss-header-content': [],
      },
    },
  } as unknown as HeaderProps;

  const mainNavigationArgs = {
    fields: {
      data: {
        item: {
          headerLogo: {
            jsonValue: {
              value: {
                src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/83a458a1cb54401cab2308488bbd1031?v=bdb6447b&t=web',
              },
            },
            alt: '',
          },
        },
      },
    },
  } as MainNavigationProps;

  const footerProps = {
    fields: {
      data: {
        item: {
          footerLogo: {
            jsonValue: {
              value: {
                src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/c78f4095acc746a98146aaa38f57a04f?v=85bba949&t=web',
                width: 413,
                height: 113,
              },
            },
            alt: '',
          },
        },
      },
    },
  } as unknown as FooterProps;

  return (
    <>
      <Head>
        <title>Play! Summit - Quick Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header {...headerProps} />
        <MainNavigation {...mainNavigationArgs} />
      </header>
      <main>
        <div>
          <p>Quick Checkout Page</p>
          <Link href="/checkout/cart">
            <a>Back to Cart</a>
          </Link>
          <Link href="/checkout/shipping">
            <a>Continue as Guest and Go to Shipping Details</a>
          </Link>
          <Link href="/account/login">
            <a>Login/ Create Account</a>
          </Link>
        </div>
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

export default QuickCheckout;
