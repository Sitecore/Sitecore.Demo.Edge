import Head from 'next/head';
import { useEffect } from 'react';
import { logViewEvent } from '../../services/CdpService';
import HeaderCdpMessageBar from '../../components/HeaderCdpMessageBar';
import Footer from '../../components/Navigation/Footer';
import Header from '../../components/Navigation/Header';
import MainNavigation from '../../components/Navigation/MainNavigation';
import ProductDetail from '../../components/Products/ProductDetail';
import { footerProps, headerProps, mainNavigationProps } from 'components/Products/Shop';

const Product = (): JSX.Element => {
  useEffect(() => {
    logViewEvent();
  });

  return (
    <>
      <Head>
        <title>Play! Summit - FATHOM1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Header {...headerProps} />
        <MainNavigation {...mainNavigationProps} />
      </header>
      <main>
        <HeaderCdpMessageBar />
        <div className="shop-container">
          <ProductDetail />
        </div>
      </main>
      <footer>
        <Footer {...footerProps} />
      </footer>
    </>
  );
};

export default Product;
