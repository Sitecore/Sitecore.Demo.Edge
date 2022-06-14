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
import { AddToCartPayload } from '../../models/cdp/AddToCartPayload';
import { logAddToCart } from '../../services/CdpService';
import Skeleton from 'react-loading-skeleton';
import { getImageUrl } from '../../helpers/LineItemsHelpers';
import Link from 'next/link';

type LineItemCardProps = {
  lineItem: DLineItem;
  editable?: boolean;
};

const LineItemCard = (props: LineItemCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

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
    setRemoveLoading(true);
    await dispatch(removeLineItem(props.lineItem.ID));
    // TODO: Log CDP add to cart with a negative quantity equal to the quantity of product removed
  }, [dispatch, props.lineItem]);

  const handleUpdateQuantity = useCallback(
    async (quantity: number) => {
      setUpdateLoading(true);
      await dispatch(
        patchLineItem({
          lineItemID: props.lineItem.ID,
          partialLineItem: { Quantity: quantity },
        })
      );
      setUpdateLoading(false);

      // TODO: Move building the event payload to CdpService, maybe using a mapper.
      const lineItem = props.lineItem;
      const addToCartPayload: AddToCartPayload = {
        product: {
          type: lineItem.Product.xp.ProductType.toUpperCase(),
          item_id: lineItem.Variant?.ID || lineItem.ProductID,
          name: lineItem.Product.Name,
          orderedAt: new Date().toISOString(),
          quantity: quantity - lineItem.Quantity,
          price: lineItem.UnitPrice,
          productId: lineItem.ProductID,
          currency: 'USD',
          referenceId: lineItem.ID,
        },
      };
      logAddToCart(addToCartPayload);
    },
    [dispatch, props.lineItem]
  );

  const handleUpdateComment = useCallback(
    async (comment: string) => {
      setUpdateLoading(true);
      await dispatch(
        patchLineItem({
          lineItemID: props.lineItem.ID,
          partialLineItem: { xp: { Comment: comment } },
        })
      );
      setUpdateLoading(false);
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
      loading={updateLoading}
      onChange={handleUpdateQuantity}
      priceSchedule={product.PriceSchedule}
    />
  );

  const btnRemove = (
    <button
      className="btn-remove"
      aria-label="Remove Line Item"
      type="button"
      disabled={updateLoading}
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
    <>
      <label htmlFor={`${props.lineItem.ID}-comment`} className="user-comment-label">
        Comments
      </label>
      <input
        id={`${props.lineItem.ID}-comment`}
        type="text"
        className="user-comment"
        defaultValue={props.lineItem.xp?.Comment}
        onBlur={(event) => handleUpdateComment(event.target.value)}
      />
    </>
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

  const lineItemCard = (
    <div className="line-item-card">
      <div className="line-item-card-details">
        <Link href={props.lineItem.Product.xp?.ProductUrl}>
          <a className="product-name">
            <h4>{props.lineItem.Product.Name}</h4>
          </a>
        </Link>
        <Link href={props.lineItem.Product.xp?.ProductUrl}>
          <a className="product-image">{productImage}</a>
        </Link>
        <div className="product-specs">
          <p>{props.lineItem.Product.xp?.Brand}</p>
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

  const content = removeLoading ? (
    // TODO: Refactor to avoid HTML repetition
    <div className="line-item-card">
      <Skeleton containerClassName="skeleton-container" height={340} />
    </div>
  ) : (
    lineItemCard
  );

  return content;
};

export default LineItemCard;
