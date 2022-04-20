import { DLineItem } from 'src/models/ordercloud/DLineItem';
import Link from 'next/link';
import { useAppDispatch } from 'src/redux/store';
import { useCallback, useState } from 'react';
import { removeLineItem } from 'src/redux/ocCurrentCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

type MiniCartItemProps = {
  lineItem: DLineItem;
  editable?: boolean;
  reviewOrder?: boolean;
};

// TODO: extract get methotds to reuse here and in LineItemCard component

const MiniCartItem = (props: MiniCartItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleRemoveItem = useCallback(async () => {
    setLoading(true);
    await dispatch(removeLineItem(props.lineItem.ID));
  }, [dispatch, props.lineItem]);

  const btnRemove = (
    <button
      className="item-remove"
      aria-label="Remove Item"
      type="button"
      disabled={loading}
      onClick={handleRemoveItem}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );

  // TODO: have specs return their key as well (ex: Color, Size, etc.)
  // currently only the values are returned (ex: Red, Large)
  const getProductSpecs = () => {
    const lineItem = props.lineItem;
    if (!lineItem.Specs?.length) {
      return '';
    }
    const specValues = lineItem.Specs.map((spec) => <p key={spec.Value}>Color: {spec.Value}</p>);
    return <>{specValues}</>;
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

  const getItemUrl = (): string => {
    const lineItem = props.lineItem;
    const itemName = lineItem.Product?.Name?.toLowerCase().replaceAll(' ', '-');
    const itemVariant = lineItem.Variant?.ID;
    const url = `/shop/products/${lineItem.ProductID}${`/${itemName}`}${`/${itemVariant}`}`;

    return url;
  };

  const productImage = (
    <img
      src={getImageUrl() || '/assets/img/shop/category-placeholder.png'}
      alt={props.lineItem.Product.Name}
    ></img>
  );

  return (
    <li>
      {btnRemove}
      <Link href={getItemUrl()}>
        <a className="mini-cart-list-item">
          <div className="item-image">{productImage}</div>
          <div className="item-details">
            <h4 className="item-name">{props.lineItem.Product.Name}</h4>
            {getProductSpecs()}
            <p>Quantity: {props.lineItem.Quantity}</p>
            <p className="item-price">${props.lineItem.LineSubtotal}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default MiniCartItem;
