import React from 'react';
import Link from 'next/link';
import { Product } from './Shop';

const ProductDetail = (): JSX.Element => {
  const alsoViewedProducts = [
    {
      image_url: '/assets/img/shop/demo/bike-lights.jpg',
      price: 25.99,
      name: 'Outrace bike light set',
      vendor: 'Outrace',
      sku: '0923',
    },
    {
      image_url: '/assets/img/shop/demo/pump-1.png',
      price: 40,
      name: 'CenterCycle Travel pump',
      vendor: 'CenterCycle',
      sku: '129489',
    },
    {
      image_url: '/assets/img/shop/demo/ratchet-kit-3.jpg',
      price: 52.95,
      name: 'CenterCycle Ratchet kit',
      vendor: 'CenterCycle',
      sku: '193405',
    },
    {
      image_url: '/assets/img/shop/demo/bike-seat-1.jpg',
      price: 119.99,
      name: 'Striva Ergonomic bike seat',
      vendor: 'Striva',
      sku: '239805',
    },
    {
      image_url: '/assets/img/shop/demo/bike-helmet-1.jpg',
      price: 50,
      name: 'Outrace lightweight bicycle helmet',
      vendor: 'Outrace',
      sku: '62382',
    },
  ];

  const similarProducts = [
    {
      image_url: '/assets/img/shop/demo/tough-and-durable-012x.jpg',
      price: 500,
      name: 'OverUnder smartwatch',
      vendor: 'OverUnder',
      sku: '1234',
    },
    {
      image_url: '/assets/img/shop/demo/smart-band-1.png',
      price: 45,
      name: 'Striva Smart band',
      vendor: 'Striva',
      sku: '2367',
    },
    {
      image_url: '/assets/img/shop/demo/prod-habitat-striva5.jpeg',
      price: 19.95,
      name: 'Striva Smart fitness tracker',
      vendor: 'Striva',
      sku: '6543',
    },
    {
      image_url: '/assets/img/shop/demo/Smart-audio-band-1.jpg',
      price: 150,
      name: 'Striva Smart audio band',
      vendor: 'Striva',
      sku: '3456',
    },
    {
      image_url: '/assets/img/shop/demo/phone-holder.jpg',
      price: 24.95,
      name: 'Striva Bike phone holder',
      vendor: 'Striva',
      sku: '2345',
    },
  ];

  return (
    <section className="section">
      <div className="section__content container">
        <div className="product-detail">
          <div className="product-detail-hero">
            <div className="product-image">
              <img
                className="product-image-main"
                src="/assets/img/shop/demo/bike-computer-1.jpg"
                alt="bike"
              />
            </div>
            <div className="product-description">
              <h2>Striva bike GPS</h2>
              <div className="product-brand">Striva</div>
              <div>
                Advanced GPS bike computer for competing and navigation.
                <br />
                <br />
                Roll like you know every hill and curve. Plus, find the routes the locals hit most.
                <br />
                <br />
                Get lost in your ride knowing it will always get you back. No backseat rider needed.
                <br />
                <br />
                Perform your very best, then beat it.
              </div>
              <div>
                Price: <span className="product-price">$256.95</span>
              </div>
              <div>
                Quantity:{' '}
                <div className="product-quantity">
                  <div className="quantity-number">1</div>
                </div>
              </div>
              <div className="product-add-to-cart">
                <Link href="#">
                  <a className="btn--main btn--main--round">Add to cart</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="product-list product-list-also-viewed">
              <h2>Customers who viewed this item also viewed</h2>
              <div className="shop-by-container">
                {alsoViewedProducts.map((product, index) => (
                  <Product key={index} {...product} />
                ))}
              </div>
            </div>
            <div className="product-list product-list-similar">
              <h2>Similar items to explore</h2>
              <div className="shop-by-container">
                {similarProducts.map((product, index) => (
                  <Product key={index} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
