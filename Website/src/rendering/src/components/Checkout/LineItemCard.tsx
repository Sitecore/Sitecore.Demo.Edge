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
    const specValues = lineItem.Specs.map((spec) => spec.Value); // ex: Red, Large
    return `${lineItem.Product.Name} (${specValues.join(',')})`;
  };

  const getImageUrl = (): string => {
    const lineItem = props.lineItem;
    if (!lineItem) {
      return null;
    }
    if (lineItem.Variant?.xp?.Images?.length) {
      return lineItem.Variant.xp.Images[0].Url;
    }
    if (lineItem.Product?.xp?.Images?.length) {
      return lineItem.Product.xp.Images[0].Url;
    }
    return null;
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

  const productImage = (
    <img
      style={{ maxHeight: '100px' }}
      src={getImageUrl() || 'https://via.placeholder.com/100'}
      alt={props.lineItem.Product.Name}
    ></img>
  );

  const quantityInput = props.editable && product && (
    <QuantityInput
      controlId={`${props.lineItem.ID}_quantity`}
      quantity={props.lineItem.Quantity}
      disabled={loading}
      onChange={handleUpdateQuantity}
      priceSchedule={product.PriceSchedule}
    />
  );

  const quantity = props.editable ? (
    <>
      <button
        aria-label="Remove Line Item"
        type="button"
        disabled={loading}
        onClick={handleRemoveLineItem}
      >
        Remove
      </button>
      {quantityInput}
    </>
  ) : (
    <p>Quantity: {props.lineItem.Quantity}</p>
  );

  const giftCheckbox = props.editable && (
    <GiftCheckboxLineItem lineItem={props.lineItem}></GiftCheckboxLineItem>
  );

  return (
    <div>
      <p>
        <strong>{getProductName()}</strong>
      </p>
      {productImage}
      {giftCheckbox}
      {quantity}
    </div>
  );
};
export default LineItemCard;
