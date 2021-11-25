import React from 'react';
import Link from 'next/link';
import { Product } from './Shop';

const ProductDetail = (): JSX.Element => {
  const products = [
    {
      imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
      price: 255.99,
    },
    {
      imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
      price: 255.99,
    },
    {
      imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
      price: 255.99,
    },
    {
      imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
      price: 255.99,
    },
    {
      imageUrl: '/assets/img/shop/demo/bike-helmet-2.png',
      price: 255.99,
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
                {products.map((product, index) => (
                  <Product key={index} {...product} />
                ))}
              </div>
            </div>
            <div className="product-list product-list-similar">
              <h2>Similar items to explore</h2>
              <div className="shop-by-container">
                {products.map((product, index) => (
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
