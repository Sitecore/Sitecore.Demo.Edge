import { useCallback, useState } from 'react';
import { DLineItem } from 'src/models/ordercloud/DLineItem';
import useOcProduct from '../../hooks/useOcProduct';
import { patchLineItem, removeLineItem } from '../../redux/ocCurrentCart';
import QuantityInput from './QuantityInput';
import GiftCheckboxLineItem from './GiftCheckboxLineItem';
import { useAppDispatch } from 'src/redux/store';

type LineItemCardProps = {
  lineItem: DLineItem;
  editable?: boolean;
};

const LineItemCard = (props: LineItemCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const product = useOcProduct(props.lineItem.ProductID);

  const getProductName = () => {
    const li = props.lineItem;
    if (!li.Specs?.length) {
      return li.Product.Name;
    }
    return `${li.Product.Name} (${li.Specs.join(',')})`;
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

  return (
    <div>
      <p>
        <strong>{getProductName()}</strong>
        {props.lineItem.Specs.map((s) => (
          <span key={s.SpecID}>
            <br />
            {`${s.Name}: ${s.Value}`}
          </span>
        ))}
      </p>

      <GiftCheckboxLineItem lineItem={props.lineItem}></GiftCheckboxLineItem>

      {props.editable ? (
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
      ) : (
        <p>{`Quantity: ${props.lineItem.Quantity}`}</p>
      )}
    </div>
  );
};
export default LineItemCard;
