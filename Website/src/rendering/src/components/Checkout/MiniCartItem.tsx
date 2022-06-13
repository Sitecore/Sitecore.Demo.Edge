import { DLineItem } from '../../models/ordercloud/DLineItem';
import Link from 'next/link';
import { useAppDispatch } from '../../redux/store';
import { useCallback, useState } from 'react';
import { removeLineItem } from '../../redux/ocCurrentCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { getImageUrl } from '../../helpers/LineItemsHelpers';

type MiniCartItemProps = {
  lineItem: DLineItem;
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
      title="Remove Item"
      type="button"
      disabled={loading}
      onClick={handleRemoveItem}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );

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

  const productImage = (
    <img
      src={getImageUrl(props.lineItem) || '/assets/img/shop/category-placeholder.png'}
      alt={props.lineItem.Product.Name}
    ></img>
  );

  return (
    <li>
      {btnRemove}
      <Link href={props.lineItem.Product.xp?.ProductUrl}>
        <a className="mini-cart-list-item">
          <div className="item-image">{productImage}</div>
          <div className="item-details">
            <h4 className="item-name">{props.lineItem.Product.Name}</h4>
            <p>{props.lineItem.Product.xp?.Brand}</p>
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
