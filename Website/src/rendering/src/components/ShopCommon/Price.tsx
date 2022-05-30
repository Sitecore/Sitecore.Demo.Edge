// TODO: add story for component

import Skeleton from 'react-loading-skeleton';
import { formatCurrency } from '../../helpers/CurrencyHelper';

type PriceProps = {
  max?: number;
  min?: number;
  price: number | string;
  finalPrice: number | string;
  altTheme?: boolean; // alt theme makes main price orange
  sizeL?: boolean;
  loading?: boolean;
};

const Price = ({ max, min, price, finalPrice, altTheme, sizeL }: PriceProps): JSX.Element => {
  if (max) {
    return (
      <div className={`price ${altTheme && 'price-orange'} ${sizeL && 'price-large'}`}>
        <span className="price-base">
          ${formatCurrency(min)} - ${formatCurrency(max)}
        </span>
      </div>
    );
  }

  const discounted = finalPrice !== price;
  const cssClass = `price ${discounted && 'price-discounted'} ${altTheme && 'price-orange'} ${
    sizeL && 'price-large'
  }
  `;
  const discount = discounted
    ? Math.round((100 * (Number(price) - Number(finalPrice))) / Number(price))
    : 0;

  const discountAndFinalPrice =
    discounted &&
    finalPrice &&
    `
      <span className="price-discount">-${discount}%</span>
      <span className="price-final">$${finalPrice}</span>
    `;

  return (
    <div className={cssClass}>
      <span className="price-base">${price}</span>
      {discountAndFinalPrice}
    </div>
  );
};

export default Price;

// TODO: Merge into one after npm package is integrated
export const PriceReact = ({
  max,
  min,
  price,
  finalPrice,
  altTheme,
  sizeL,
  loading,
}: PriceProps): JSX.Element => {
  if (loading) {
    return (
      // TODO: Refactor to avoid HTML repetition
      // TODO: Extract JSX logic into a const
      <div className={`price ${sizeL && 'price-large'}`}>
        <span className="price-base">
          <Skeleton width={70} />
        </span>
      </div>
    );
  }

  if (max) {
    return (
      // TODO: Extract JSX logic into a const
      <div className={`price ${altTheme && 'price-orange'} ${sizeL && 'price-large'}`}>
        <span className="price-base">
          ${formatCurrency(min)} - ${formatCurrency(max)}
        </span>
      </div>
    );
  }

  const discounted = finalPrice !== price;
  const cssClass = `price ${discounted && 'price-discounted'} ${altTheme && 'price-orange'} ${
    sizeL && 'price-large'
  }`;
  const discount = discounted
    ? Math.round((100 * (Number(price) - Number(finalPrice))) / Number(price))
    : 0;

  const discountAndFinalPrice = discounted && finalPrice && (
    <>
      <span className="price-discount">-{discount}%</span>
      <span className="price-final">${finalPrice}</span>
    </>
  );

  return (
    <div className={cssClass}>
      <span className="price-base">${price}</span>
      {discountAndFinalPrice}
    </div>
  );
};
