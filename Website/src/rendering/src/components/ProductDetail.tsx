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
        <img className="w-full" src="/assets/img/shop/cycling/biketeal.jpeg" alt="bike" />
        <img
          className="m-auto p-2 h-24"
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
            className="inline-flex justify-left w-full border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 flex justify-between"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <span className="w-5 text-left">L</span>{' '}
            <span className="w-1 text-yellow-dark">Limited&nbsp;Stock</span>
            <img className="h-5 w-5 text-right" src="/assets/img/icons/down-arrow.svg" alt="^" />
          </button>
        </div>
        <div>
          In store now and available for pick up in 3- 5 business days at these Giant retailers
          (distance from <span className="text-blue">Dublin</span>):
        </div>
        <hr className="border-gray" />
        <div>
          FEEL GOOD BICYCLES LIMITED
          <br />
          77.2 KM | Virginia ULS
          <br />
          <u>SHOW DETAILS</u>
        </div>
        <hr className="border-gray" />
        <div>
          <span className="text-blue-dark">Notify me when available at any Giant retailer</span>
          <br />
          SHARE
          <br />
          <img src="/assets/img/icons/share.png" alt="share" />
        </div>
        <hr className="border-gray" />
        <div>
          3 OTHER BIKES THAT ARE SIMILAR TO THIS ONE
          <br />
          <span className="text-yellow-dark">LIMITED STOCK</span>
          <br />
          <img src="/assets/img/shop/cycling/similar-bikes.png" alt="share" />
        </div>
      </div>
    </div>
    <div className="product-info">
      <div className="product-info-header">
        <a href="#specs">
          <FontAwesomeIcon className="icon" icon={faBorderAll} />
          <br />
          SPECS
        </a>
        <a href="#specs">
          <FontAwesomeIcon className="icon" icon={faStar} />
          <br />
          Highlights
        </a>
        <a href="#highlights">
          <FontAwesomeIcon className="icon" icon={faArrowsAlt} />
          <br />
          geometry
        </a>
        <a href="#geometry">
          <FontAwesomeIcon className="icon" icon={faCog} />
          <br />
          Techs
        </a>
        <a href="#similar">
          <FontAwesomeIcon className="icon" icon={faLink} />
          <br />
          Similar
        </a>
        <a href="#reviews">
          <FontAwesomeIcon className="icon" icon={faNewspaper} />
          <br />
          reviews
        </a>
      </div>
      <div id="specs" className="bg-gray-light p-5 md:p-20 text-sm space-y-2">
        <p className="text-lg">SPECIFICATIONS</p>
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
        <p className="uppercase text-lg">KEY PERFORMANCE FACTORS</p>
        <p className="font-bold">Trail Tuned Design</p>
        <p>
          ALUXX SL aluminium frameset is hand-built in-house by the world leader in aluminium
          engineering.
        </p>
        <p className="font-bold">Responsive Handling</p>
        <p>
          Frame geometry is designed to optimise the confident, stable handling of plush high volume
          tyres (27.5x2.6), and is ideal for rugged, adventurous terrain.
        </p>
        <p className="font-bold">Smooth Control</p>
        <p>
          More relaxed frame geometry (compared to XC) and control-focused components deliver added
          control for trail riding conditions.
        </p>

        <p></p>
      </div>
      <div id="highlights" className="product-specs">
        <div className="product-specs-row">
          <span>Sizes</span>
          <span>S, M, L, XL</span>
          <span>Cassette</span>
          <span>SRAM SX Eagle, 11x50</span>
        </div>
        <div className="product-specs-row">
          <span>Colours</span>
          <span>Gloss Teal</span>
          <span>Chain</span>
          <span>SRAM SX Eagle</span>
        </div>
        <div className="p-10 mx-auto w-full text-center">
          All specifications listed are subject to change without notice.
        </div>
      </div>
      <div id="geometry" className="product-highlight">
        <h2>HIGHLIGHTS</h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          <Link href="/shop" passHref>
            <div className="rounded overflow-hidden">
              <img
                className="w-full border b-1 border-gray-dark h-40"
                src="/assets/img/shop/featured-watch.jpeg"
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base text-center">
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
            <div className="rounded overflow-hidden">
              <img
                className="w-full border b-1 border-gray-dark h-40"
                src="/assets/img/shop/featured-shoe.jpeg"
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base text-center">
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
            <div className="rounded overflow-hidden">
              <img
                className="w-full border b-1 border-gray-dark h-40"
                src="/assets/img/shop/helmet.jpeg"
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base text-center">
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
            <div className="rounded overflow-hidden">
              <img
                className="w-full border b-1 border-gray-dark h-40"
                src="/assets/img/shop/luxe-bike.jpeg"
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base text-center">
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
            <div className="rounded overflow-hidden">
              <img
                className="w-full border b-1 border-gray-dark h-40"
                src="/assets/img/shop/center-top.jpeg"
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base text-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 text-sm">
          <Link href="/shop" passHref>
            <div className="overflow-hidden">
              <div
                className="w-full h-40"
                style={{
                  backgroundImage: 'url("/assets/img/shop/cycling-banner.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="px-6 py-4">
                <p className="text-gray-700 text-center">Peak performance</p>
              </div>
            </div>
          </Link>
          <Link href="/shop" passHref>
            <div className="overflow-hidden">
              <div
                className="w-full h-40"
                style={{
                  backgroundImage: 'url("/assets/img/shop/smartwatch-828786.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="px-6 py-4">
                <p className="text-gray-700 text-center">Optimizing your training plan</p>
              </div>
            </div>
          </Link>
          <Link href="/shop" passHref>
            <div className="overflow-hidden">
              <div
                className="w-full h-40"
                style={{
                  backgroundImage: 'url("/assets/img/shop/man-biker.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="px-6 py-4">
                <p className="text-gray-700 text-center">Racing to success</p>
              </div>
            </div>
          </Link>
          <Link href="/shop" passHref>
            <div className="overflow-hidden">
              <div
                className="w-full h-40"
                style={{
                  backgroundImage: 'url("/assets/img/shop/race-car.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="px-6 py-4">
                <p className="text-gray-700 text-center">A better drive top 10 tips</p>
              </div>
            </div>
          </Link>
          <Link href="/shop" passHref>
            <div className="overflow-hidden">
              <div
                className="w-full h-40"
                style={{
                  backgroundImage: 'url("/assets/img/shop/ice-climbing.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="px-6 py-4">
                <p className="text-gray-700 text-center">Scaling new heights</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;
