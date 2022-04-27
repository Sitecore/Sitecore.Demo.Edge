import { useCallback, useState } from 'react';
import { DLineItem } from 'src/models/ordercloud/DLineItem';
import useOcProduct from '../../hooks/useOcProduct';
import { patchLineItem, removeLineItem } from '../../redux/ocCurrentCart';
import QuantityInput from '../ShopCommon/QuantityInput';
import { PriceReact } from '../ShopCommon/Price';
import GiftCheckboxLineItem from './GiftCheckboxLineItem';
import { useAppDispatch } from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

type LineItemCardProps = {
  lineItem: DLineItem;
  editable?: boolean;
};

const LineItemCard = (props: LineItemCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const product = useOcProduct(props.lineItem.ProductID);

  // TODO: have specs return their key as well (ex: Color, Size, etc.)
  // currently only the values are returned (ex: Red, Large)
  const getProductSpecs = () => {
    const lineItem = props.lineItem;
    if (!lineItem.Specs?.length) {
      return '';
    }
    const specValues = lineItem.Specs.map((spec) => <p key={spec.Value}>Color: {spec.Value}</p>);
    return <div className="product-specs">{specValues}</div>;
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

  // TODO: add branded placeholder img
  const productImage = (
    <img
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

  const btnRemove = (
    <button
      className="btn-remove"
      aria-label="Remove Line Item"
      type="button"
      disabled={loading}
      onClick={handleRemoveLineItem}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );

  // TODO: add functionality to button
  const btnWishList = (
    <button className="btn-wishlist" aria-label="Add to Wish List" type="button">
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );

  // TODO: add functionality to button
  const btnSaveLater = (
    <button className="btn-later" aria-label="Save for Later" type="button">
      <FontAwesomeIcon icon={faHistory} />
    </button>
  );

  const quantityBlock = props.editable ? (
    <>
      {quantityInput}
      {btnRemove}
      {btnWishList}
      {btnSaveLater}
    </>
  ) : (
    <p className="quantity-static">
      <span className="quantity-label">Quantity: </span>
      <span className="quantity-num">{props.lineItem.Quantity}</span>
    </p>
  );

  const giftCheckbox = props.editable && (
    <GiftCheckboxLineItem lineItem={props.lineItem}></GiftCheckboxLineItem>
  );

  // TODO: add functionality to input
  const userComment = (
    <input type="text" placeholder="Text input for user..." className="user-comment" />
  );

  // TODO: add functionality to field
  const quantityAlert = <p className="quantity-alert">Only 3 left!</p>;

  // TODO: specs to return base and final price
  const priceBlock = (
    <PriceReact
      price={props.lineItem.UnitPrice}
      finalPrice={props.lineItem.UnitPrice}
      altTheme={true}
      sizeL={true}
    />
  );

  return (
    <div className="line-item-card">
      <div className="line-item-card-details">
        <h4 className="product-name">{props.lineItem.Product.Name}</h4>
        {productImage}
        {getProductSpecs()}
      </div>
      {userComment}
      {giftCheckbox}
      <div className="line-item-card-footer">
        {quantityBlock}
        {quantityAlert}
        {priceBlock}
      </div>
    </div>
  );
};

export default LineItemCard;
