import Head from 'next/head';
import { useEffect } from 'react';
import { logViewEvent } from '../../services/CdpService';
import {
  ExpandableDropDown,
  FeaturedProductHero,
  ProductSearchBar,
  searchBarProps,
  ShopLayout,
} from '../../components/Products/Shop';

const Products = (): JSX.Element => {
  const dropdownControls = [
    {
      title: 'Brand',
      dropdownItems: [
        { text: 'Alba', value: 'Alba' },
        { text: 'Striva', value: 'Striva' },
      ],
    },
    {
      title: 'Colors',
      dropdownItems: [
        { text: 'Black', value: 'Black' },
        { text: 'White', value: 'White' },
        { text: 'Silver', value: 'Silver' },
      ],
    },
    {
      title: 'Price',
      dropdownItems: [
        { text: '$0-$100', value: '1' },
        { text: '$101-$500', value: '2' },
        { text: '$501-$1000', value: '3' },
      ],
    },
    {
      title: 'Customer reviews',
      dropdownItems: [
        { text: '⭐', value: '1' },
        { text: '⭐⭐', value: '2' },
        { text: '⭐⭐⭐', value: '3' },
        { text: '⭐⭐⭐⭐', value: '4' },
        { text: '⭐⭐⭐⭐⭐', value: '5' },
      ],
    },
  ];

  useEffect(() => {
    logViewEvent();
  });

  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Products</title>
      </Head>

      <FeaturedProductHero subPageName="Products" />
      <section className="section">
        <div data-rfkid="rfkid_7"></div>
        {/* <div className="section__content container">
          <div id="shop-content-container">
            <div id="dropdown-container">
              {dropdownControls.map((dropdown) => (
                <ExpandableDropDown
                  key={dropdown.title}
                  title={dropdown.title}
                  items={dropdown.dropdownItems}
                  onClick={(value) => console.log(value)}
                />
              ))}
            </div>
            <ProductSearchBar reflektionProps={searchBarProps.reflektionProps} />
          </div>
        </div> */}
      </section>
      {/* TODO: add products listing grid */}
    </ShopLayout>
  );
};

export default Products;
