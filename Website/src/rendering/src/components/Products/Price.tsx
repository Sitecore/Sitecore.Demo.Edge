// TODO: add story for component

type PriceProps = {
  max: number;
  min: number;
  price: number;
  finalPrice: number;
};

const Price = (props: PriceProps): JSX.Element => {
  const { max, min, price, finalPrice } = props;

  if (max) {
    return window.RFK.ui.html`
      <div className="price">
        <span className="price-base">$${min} - $${max}</span>
      </div>
    `;
  }

  const discounted = finalPrice !== price;
  const cssClass = discounted ? 'price price-discounted' : 'price';
  const discount = discounted ? Math.round((100 * (price - finalPrice)) / price) : 0;

  const discountAndFinalPrice =
    discounted &&
    finalPrice &&
    window.RFK.ui.html`
      <span className="price-discount">-${discount}%</span>
      <span className="price-final">$${finalPrice}</span>
    `;

  return window.RFK.ui.html`
    <div className=${cssClass}>
      <span className="price-base">$${price}</span>
      ${discountAndFinalPrice}
    </div>
  `;
};

export default Price;
