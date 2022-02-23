import { useCallback, useState } from 'react';
import { DLineItem } from 'src/models/ordercloud/DLineItem';
import useOcProduct from '../../hooks/useOcProduct';
import { patchLineItem, removeLineItem } from '../../redux/ocCurrentCart';
import QuantityInput from './QuantityInput';
import GiftCheckboxLineItem from './GiftCheckboxLineItem';
import { useAppDispatch } from '../../redux/store';

type LineItemCardProps = {
  lineItem: DLineItem;
  editable?: boolean;
};

const LineItemCard = (props: LineItemCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const product = useOcProduct(props.lineItem.ProductID);

  const getProductName = () => {
    const lineItem = props.lineItem;
    if (!lineItem.Specs?.length) {
      return lineItem.Product.Name;
    }
    return `${lineItem.Product.Name} (${lineItem.Specs.join(',')})`;
  };

  const handleRemoveLineItem = useCallback(async () => {
    setLoading(true);
    await dispatch(removeLineItem(props.lineItem.ID));
  }, [dispatch, props.lineItem]);

  const handleUpdateQuantity = useCallback(
    async (quantity: number) => {
      setLoading(true);
      await dispatch(
        patchLineItem({
          lineItemID: props.lineItem.ID,
          partialLineItem: { Quantity: quantity },
        })
      );
      setLoading(false);
    },
    [dispatch, props.lineItem]
  );

  const quantityInput = props.editable && product && (
    <>
      <button
        aria-label="Remove Line Item"
        type="button"
        disabled={loading}
        onClick={handleRemoveLineItem}
      >
        Remove
      </button>
      {product && (
        <QuantityInput
          controlId={`${props.lineItem.ID}_quantity`}
          quantity={props.lineItem.Quantity}
          disabled={loading}
          onChange={handleUpdateQuantity}
          priceSchedule={product.PriceSchedule}
        />
      )}
    </>
  );

  const quantity = props.editable ? (
    <>
      {' '}
      <button
        aria-label="Remove Line Item"
        type="button"
        disabled={loading}
        onClick={handleRemoveLineItem}
      >
        {' '}
        Remove{' '}
      </button>{' '}
      {quantityInput}{' '}
    </>
  ) : (
    <p>Quantity: {props.lineItem.Quantity}</p>
  );

  return (
    <div>
      <p>
        <strong>{getProductName()}</strong>
        {props.lineItem.Specs.map((spec) => (
          <span key={spec.SpecID}>
            <br />
            {`${spec.Name}: ${spec.Value}`}
          </span>
        ))}
      </p>

      <GiftCheckboxLineItem lineItem={props.lineItem}></GiftCheckboxLineItem>
      {quantity}
    </div>
  );
};
export default LineItemCard;
