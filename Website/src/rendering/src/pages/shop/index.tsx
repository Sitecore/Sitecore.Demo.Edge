import Head from 'next/head';
import { ShopLayout } from '../../components/Products/Shop';
import CategoriesList from '../../components/Products/CategoriesList';

const Shop = (): JSX.Element => {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP</title>
      </Head>

      <CategoriesList
        title="Welcome to PLAY! SHOP"
        subtitle="Shop Trending Categories:"
        theme="orange"
      />
      <section className="section">
        <div className="section__content container">Content here</div>
      </section>
    </ShopLayout>
  );
};

export default Shop;
