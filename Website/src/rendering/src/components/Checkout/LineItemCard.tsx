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
import { getImageUrl } from '../../helpers/LineItemsHelpers';

type LineItemCardProps = {
  lineItem: DLineItem;
  editable?: boolean;
};

const LineItemCard = (props: LineItemCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const product = useOcProduct(props.lineItem.ProductID);

  const getProductSpecs = () => {
    const lineItem = props.lineItem;
    if (!lineItem.Specs?.length) {
      return '';
    }
    const specValues = lineItem.Specs.map((spec) => (
      <p key={spec.Value}>
        {spec.Name}: {spec.Value}
      </p>
    ));
    return <>{specValues}</>;
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

  const handleUpdateComment = useCallback(
    async (comment: string) => {
      setLoading(true);
      await dispatch(
        patchLineItem({
          lineItemID: props.lineItem.ID,
          partialLineItem: { xp: { Comment: comment } },
        })
      );
      setLoading(false);
    },
    [dispatch, props.lineItem]
  );

  const productImage = (
    <img
      src={getImageUrl(props.lineItem) || '/assets/img/shop/category-placeholder.png'}
      alt={props.lineItem.Product.Name}
    ></img>
  );

  const quantityInput = props.editable && product && (
    <QuantityInput
      controlId={`${props.lineItem.ID}_quantity`}
      initialQuantity={props.lineItem.Quantity}
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

  const staticQuantityBlock = !props.editable && (
    <p className="quantity-static">
      <span className="quantity-label">Quantity: </span>
      <span className="quantity-num">{props.lineItem.Quantity}</span>
    </p>
  );

  const editableQuantityBlock = props.editable && (
    <>
      {quantityInput}
      {btnRemove}
      {btnWishList}
      {btnSaveLater}
    </>
  );

  const giftCheckbox = props.editable && (
    <GiftCheckboxLineItem lineItem={props.lineItem}></GiftCheckboxLineItem>
  );

  const editableUserComment = props.editable && (
    <input
      type="text"
      placeholder="Text input for user..."
      className="user-comment"
      defaultValue={props.lineItem.xp?.Comment}
      // TODO: Investigate if we need to disable the "Proceed to Checkout" button while the comment is being saved
      onBlur={(event) => handleUpdateComment(event.target.value)}
    />
  );

  const staticUserComment = !props.editable && <p>{props.lineItem.xp?.Comment}</p>;

  // TODO: add functionality to field
  const quantityAlert = props.editable && <p className="quantity-alert">Only 3 left!</p>;

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
        <div className="product-specs">
          {getProductSpecs()}
          {staticQuantityBlock}
          {staticUserComment}
        </div>
      </div>
      {editableUserComment}
      {giftCheckbox}
      <div className="line-item-card-footer">
        {editableQuantityBlock}
        {quantityAlert}
        {priceBlock}
      </div>
    </div>
  );
};

export default LineItemCard;
