//import Link from 'next/link';

const ProductDetail = (): JSX.Element => (
  <div className="product">
    <div className="product-detail">
      <div className="product-image">
        <img src="/assets/img/shop/cycling/biketeal.jpeg" alt="bike" />
      </div>
      <div className="product-description">
        <h1>FATHOM1</h1>
        <strong>$1,899</strong>
        <button
          type="button"
          className="inline-flex justify-left w-full border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span className="float-left">L</span> <span className="float-right">Limited Stock</span>
          <img
            className="h-5 align-right justify-right float-right"
            src="/assets/img/icons/down-arrow.svg"
            alt="^"
          />
        </button>
      </div>
    </div>
  </div>
);

export default ProductDetail;
