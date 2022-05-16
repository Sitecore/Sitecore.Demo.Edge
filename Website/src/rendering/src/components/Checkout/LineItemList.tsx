import { Actions, PageController } from '@sitecore-discover/react';
import { useEffect } from 'react';
import mapProductsForDiscover from '../../../src/helpers/discover/ProductMapper';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import LineItemCard from './LineItemCard';

type LineItemListProps = {
  editable?: boolean;
};

const LineItemList = (props: LineItemListProps): JSX.Element => {
  const { lineItems } = useOcCurrentOrder();

  const dispatchDiscoverCartStatusListActionEvent = () => {
    PageController.getDispatcher().dispatch({
      type: Actions.CART_STATUS,
      payload: {
        products: mapProductsForDiscover(lineItems),
      },
    });
  };

  useEffect(() => {
    if (lineItems?.length !== undefined) {
      dispatchDiscoverCartStatusListActionEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItems]);

  return lineItems && lineItems.length ? (
    <ol className="line-item-list">
      {lineItems.map((lineItem) => (
        <li key={lineItem.ID}>
          <LineItemCard lineItem={lineItem} editable={props.editable} />
        </li>
      ))}
    </ol>
  ) : (
    <h3>No line items</h3>
  );
};

export default LineItemList;
