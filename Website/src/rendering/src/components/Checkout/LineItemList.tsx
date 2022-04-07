import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import LineItemCard from './LineItemCard';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';

type LineItemListProps = {
  editable?: boolean;
};

const LineItemList = (props: LineItemListProps): JSX.Element => {
  const { lineItems, initialized } = useOcCurrentCart();
  const skeletonCount = 2;

  const getContent = () => {
    if (!initialized) {
      return (
        <ol className="line-item-list">
          {new Array(skeletonCount).fill('').map((_, index) => {
            return (
              <li key={index}>
                <div className="line-item-card">
                  <Skeleton containerClassName="skeleton-container" height={340} />
                </div>
              </li>
            );
          })}
        </ol>
      );
    } else if (lineItems?.length) {
      return (
        <ol className="line-item-list">
          {lineItems.map((lineItem) => (
            <li key={lineItem.ID}>
              <LineItemCard lineItem={lineItem} editable={props.editable} />
            </li>
          ))}
        </ol>
      );
    } else {
      return (
        <>
          <p>It doesn&apos;t look like you have any items in your cart</p>
          <p>
            <Link href="/shop">
              <a className="btn--main btn--main--round continue-shopping-btn">Continue Shopping</a>
            </Link>
          </p>
        </>
      );
    }
  };

  return getContent();
};

export default LineItemList;
