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
                src="/assets/img/shop/cycling/BikeTeal.jpeg"
                alt="bike"
              />
            </div>
            <div className="product-description">
              <h2>FATHOM1</h2>
              <div>
                The combination of a lightweight hardtail frame, 130mm suspension fork and 27.5
                wheels with wide rims and high-volume tyres delivers loads of traction, speed and
                fun on the trail.
              </div>
              <div>
                Price: <span className="product-price">$1,899</span>
              </div>
              <div>
                Quantity:{' '}
                <div className="product-quantity">
                  <div className="quantity-number">2</div>
                </div>
              </div>
              <div className="product-add-to-cart">
                <Link href="#">
                  <a className="btn--main btn--main--round">Add to cart</a>
                </Link>
              </div>
              <div className="product-similar-items">
                3 OTHER BIKES THAT ARE SIMILAR TO THIS ONE
                <br />
                <span className="product-warning">LIMITED STOCK</span>
              </div>
              <img src="/assets/img/shop/cycling/similar-bikes.png" alt="share" />
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
            <div id="specs" className="product-specs">
              <p className="product-specs-section-title">PRODUCT DESCRIPTION AND SPECIFICATIONS</p>
              <p>
                With its updated ALUXX SL aluminium frame, quick-handling 27.5 wheels and
                high-volume tyres, Fathom is a great choice for technical terrain and singletrack
                shredding. It blends the efficient ride quality of a classic hardtail with the
                confident ride quality of larger tyres that absorb bumps and give you more traction
                - so you can tackle rougher trails with total control. The frame is designed with
                trail-friendly geometry that includes a more relaxed head angle and a 130mm
                suspension fork.
              </p>
              <p className="product-specs-section-title">KEY PERFORMANCE FACTORS</p>
              <div>
                <p className="product-specs-section-subtitle">Trail Tuned Design</p>
                <p>
                  ALUXX SL aluminium frameset is hand-built in-house by the world leader in
                  aluminium engineering.
                </p>
              </div>
              <div>
                <p className="product-specs-section-subtitle">Responsive Handling</p>
                <p>
                  Frame geometry is designed to optimise the confident, stable handling of plush
                  high volume tyres (27.5x2.6), and is ideal for rugged, adventurous terrain.
                </p>
              </div>
              <div>
                <p className="product-specs-section-subtitle">Smooth Control</p>
                <p>
                  More relaxed frame geometry (compared to XC) and control-focused components
                  deliver added control for trail riding conditions.
                </p>
              </div>
            </div>
            <div id="highlights" className="product-highlights">
              <div className="product-highlights-row">
                <span>Sizes</span>
                <span>S, M, L, XL</span>
                <span>Cassette</span>
                <span>SRAM SX Eagle, 11x50</span>
              </div>
              <div className="product-highlights-row">
                <span>Colours</span>
                <span>Gloss Teal</span>
                <span>Chain</span>
                <span>SRAM SX Eagle</span>
              </div>
              <div className="product-highlights-notice">
                All specifications listed are subject to change without notice.
              </div>
            </div>
            <div id="geometry" className="product-geometry">
              <h2>GEOMETRY</h2>
              <p>
                Built on a lightweight ALUXX SL aluminum frameset with progressive trail geometry,
                this hardtail features 27.5-inch wheels with grippy, high-vol-ume 2.6-inch tires. It
                has a number of trail-specific features including a 130mm suspension fork and
                dropper seatpost. Here’s a look at Fathom’s key technologies:
              </p>
              <img src="/assets/img/shop/cycling/bike-specs.png" alt="share" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
