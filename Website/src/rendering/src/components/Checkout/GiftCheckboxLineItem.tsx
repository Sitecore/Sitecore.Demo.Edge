import { useCallback, useState } from 'react';
import { DLineItem } from '../../models/ordercloud/DLineItem';
import { patchLineItem } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';

type GiftCheckboxLineItemProps = {
  lineItem: DLineItem;
};

const GiftCheckboxLineItem = (props: GiftCheckboxLineItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(Boolean(props.lineItem?.xp?.IsGift));
  const [loading, setLoading] = useState(false);
  const updateLineItem = useCallback(
    async (newChecked: boolean) => {
      setLoading(true);
      await dispatch(
        patchLineItem({
          lineItemID: props.lineItem.ID,
          partialLineItem: { xp: { IsGift: newChecked } },
        })
      );
      setLoading(false);
    },
    [dispatch, props.lineItem.ID]
  );

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    updateLineItem(newChecked);
  };
  const labelId = `gift-checkbox-lineitem-${props.lineItem.ID}`;

  return (
    <label htmlFor={labelId} className="gift-checkbox">
      <input
        id={labelId}
        type="checkbox"
        checked={checked}
        disabled={loading}
        onChange={handleToggle}
      />
      <span className="label-text">
        {props.lineItem.Quantity > 1 ? 'These items are a gift' : 'This item is a gift'}
      </span>
    </label>
  );
};

export default GiftCheckboxLineItem;
