import {
  faBorderAll,
  faStar,
  faArrowsAlt,
  faCog,
  faLink,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const ProductDetail = (): JSX.Element => (
  <div className="product">
    <div className="product-detail">
      <div className="product-image">
        <img
          className="product-image-main"
          src="/assets/img/shop/cycling/BikeTeal.jpeg"
          alt="bike"
        />
        <img
          className="product-image-thumbnails"
          src="/assets/img/shop/cycling/thumbnail-bike.png"
          alt="bike"
        />
      </div>
      <div className="product-description">
        <div>
          <h2>FATHOM1</h2>
        </div>
        <div>
          <strong>$1,899</strong>
        </div>
        <div>
          <button
            type="button"
            className="product-variant-selector"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            aria-label="Select Size"
          >
            <span className="product-variant-name">L</span>{' '}
            <span className="product-variant-warning">Limited&nbsp;Stock</span>
            <img src="/assets/img/icons/down-arrow.svg" alt="^" />
          </button>
        </div>
        <div>
          In store now and available for pick up in 3- 5 business days at these Giant retailers
          (distance from <span className="text-blue">Dublin</span>):
        </div>
        <hr />
        <div>
          FEEL GOOD BICYCLES LIMITED
          <br />
          77.2 KM | Virginia ULS
          <br />
          <u>SHOW DETAILS</u>
        </div>
        <hr />
        <div>
          <span className="text-blue-dark">Notify me when available at any Giant retailer</span>
          <br />
          SHARE
          <br />
          <img src="/assets/img/icons/share.png" alt="share" />
        </div>
        <hr />
        <div className="product-similar-items">
          3 OTHER BIKES THAT ARE SIMILAR TO THIS ONE
          <br />
          <span className="product-warning">LIMITED STOCK</span>
          <br />
          <img src="/assets/img/shop/cycling/similar-bikes.png" alt="share" />
        </div>
      </div>
    </div>
    <div className="product-info">
      <div className="product-info-header">
        <a href="#specs">
          <FontAwesomeIcon icon={faBorderAll} />
          <br />
          SPECS
        </a>
        <a href="#specs">
          <FontAwesomeIcon icon={faStar} />
          <br />
          Highlights
        </a>
        <a href="#highlights">
          <FontAwesomeIcon icon={faArrowsAlt} />
          <br />
          geometry
        </a>
        <a href="#geometry">
          <FontAwesomeIcon icon={faCog} />
          <br />
          Techs
        </a>
        <a href="#similar">
          <FontAwesomeIcon icon={faLink} />
          <br />
          Similar
        </a>
        <a href="#reviews">
          <FontAwesomeIcon icon={faNewspaper} />
          <br />
          reviews
        </a>
      </div>
      <div id="specs" className="product-specs">
        <p className="product-specs-section-title">SPECIFICATIONS</p>
        <p>
          Get your dose of singletrack on a fun hardtail that puts you in control. The combination
          of a lightweight hardtail frame, 130mm suspension fork and 27.5 wheels with wide rims and
          high-volume tyres delivers loads of traction, speed and fun on the trail.
        </p>
        <p>
          With its updated ALUXX SL aluminium frame, quick-handling 27.5 wheels and high-volume
          tyres, Fathom is a great choice for technical terrain and singletrack shredding. It blends
          the efficient ride quality of a classic hardtail with the confident ride quality of larger
          tyres that absorb bumps and give you more traction - so you can tackle rougher trails with
          total control. The frame is designed with trail-friendly geometry that includes a more
          relaxed head angle and a 130mm suspension fork.
        </p>
        <p className="product-specs-section-title">KEY PERFORMANCE FACTORS</p>
        <p className="product-specs-section-subtitle">Trail Tuned Design</p>
        <p>
          ALUXX SL aluminium frameset is hand-built in-house by the world leader in aluminium
          engineering.
        </p>
        <p className="product-specs-section-subtitle">Responsive Handling</p>
        <p>
          Frame geometry is designed to optimise the confident, stable handling of plush high volume
          tyres (27.5x2.6), and is ideal for rugged, adventurous terrain.
        </p>
        <p className="product-specs-section-subtitle">Smooth Control</p>
        <p>
          More relaxed frame geometry (compared to XC) and control-focused components deliver added
          control for trail riding conditions.
        </p>
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
          Built on a lightweight ALUXX SL aluminum frameset with progressive trail geometry, this
          hardtail features 27.5-inch wheels with grippy, high-vol-ume 2.6-inch tires. It has a
          number of trail-specific features including a 130mm suspension fork and dropper seatpost.
          Here’s a look at Fathom’s key technologies:
        </p>
        <img src="/assets/img/shop/cycling/bike-specs.png" alt="share" />
      </div>
      <div id="similar" className="product-other">
        <h2>Other products</h2>
        <div className="product-other-grid">
          <Link href="/shop" passHref>
            <div className="product-other-grid-product">
              <img src="/assets/img/shop/featured-watch.jpeg" alt="Mountain" />
              <div className="product-other-grid-product-details">
                <p className="product-other-grid-product-details-text">
                  <strong>Smart Watch</strong>
                  <br />
                  Striva
                  <br />
                  $450
                </p>
              </div>
            </div>
          </Link>

          <Link href="/shop" passHref>
            <div className="product-other-grid-product">
              <img src="/assets/img/shop/featured-shoe.jpeg" alt="Mountain" />
              <div className="product-other-grid-product-details">
                <p className="product-other-grid-product-details-text">
                  <strong>Race Bike Shoes</strong>
                  <br />
                  Prostaff
                  <br />
                  $150
                </p>
              </div>
            </div>
          </Link>

          <Link href="/shop" passHref>
            <div className="product-other-grid-product">
              <img src="/assets/img/shop/helmet.jpeg" alt="Mountain" />
              <div className="product-other-grid-product-details">
                <p className="product-other-grid-product-details-text">
                  <strong>Speed Biking Helmet</strong>
                  <br />
                  Center Cycle
                  <br />
                  $89
                </p>
              </div>
            </div>
          </Link>

          <Link href="/shop" passHref>
            <div className="product-other-grid-product">
              <img src="/assets/img/shop/luxe-bike.jpeg" alt="Mountain" />
              <div className="product-other-grid-product-details">
                <p className="product-other-grid-product-details-text">
                  <strong>Luxe Mountain Bike</strong>
                  <br />
                  Dwell
                  <br />
                  $550
                </p>
              </div>
            </div>
          </Link>

          <Link href="/shop" passHref>
            <div className="product-other-grid-product">
              <img src="/assets/img/shop/center-top.jpeg" alt="Mountain" />
              <div className="product-other-grid-product-details">
                <p className="product-other-grid-product-details-text">
                  <strong>Men&apos;s Biking Top</strong>
                  <br />
                  Center Cycle
                  <br />
                  $150
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div id="reviews" className="product-events">
        <h2>Opening Events and Workshops</h2>
        <div className="product-events-grid">
          <Link href="/shop" passHref>
            <div className="product-events-grid-event">
              <div
                className="product-events-grid-event-image"
                style={{
                  backgroundImage: 'url("/assets/img/shop/cycling-banner.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="product-events-grid-event-details">
                <p className="product-events-grid-event-details-text">Peak performance</p>
              </div>
            </div>
          </Link>
          <Link href="/shop" passHref>
            <div className="product-events-grid-event">
              <div
                className="product-events-grid-event-image"
                style={{
                  backgroundImage: 'url("/assets/img/shop/smartwatch-828786.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="product-events-grid-event-details">
                <p className="product-events-grid-event-details-text">
                  Optimizing your training plan
                </p>
              </div>
            </div>
          </Link>
          <Link href="/shop" passHref>
            <div className="product-events-grid-event">
              <div
                className="product-events-grid-event-image"
                style={{
                  backgroundImage: 'url("/assets/img/shop/man-biker.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="product-events-grid-event-details">
                <p className="product-events-grid-event-details-text">Racing to success</p>
              </div>
            </div>
          </Link>
          <Link href="/shop" passHref>
            <div className="product-events-grid-event">
              <div
                className="product-events-grid-event-image"
                style={{
                  backgroundImage: 'url("/assets/img/shop/race-car.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="product-events-grid-event-details">
                <p className="product-events-grid-event-details-text">A better drive top 10 tips</p>
              </div>
            </div>
          </Link>
          <Link href="/shop" passHref>
            <div className="product-events-grid-event">
              <div
                className="product-events-grid-event-image"
                style={{
                  backgroundImage: 'url("/assets/img/shop/ice-climbing.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="product-events-grid-event-details">
                <p className="product-events-grid-event-details-text">Scaling new heights</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;
