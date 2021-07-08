//import Link from 'next/link';

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
          <img src="/assets/img/icons/similar-bikes.png" alt="share" />
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;
