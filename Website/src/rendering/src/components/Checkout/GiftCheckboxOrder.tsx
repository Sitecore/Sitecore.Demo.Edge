import { useState, useCallback } from 'react';
import { DOrder } from 'src/models/ordercloud/DOrder';
import { patchOrder } from 'src/redux/ocCurrentCart';
import { useAppDispatch } from 'src/redux/store';

type GiftCheckboxOrderProps = {
  order: DOrder;
};

const GiftCheckboxOrder = (props: GiftCheckboxOrderProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(Boolean(props.order.xp?.IsGift));
  const [loading, setLoading] = useState(false);
  const updateOrder = useCallback(
    async (newChecked: boolean) => {
      setLoading(true);
      await dispatch(patchOrder({ xp: { IsGift: newChecked } }));
      setLoading(false);
    },
    [dispatch]
  );
  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    updateOrder(newChecked);
  };
  return (
    <label htmlFor="gift-checkbox-order">
      <input
        id="gift-checkbox-order"
        type="checkbox"
        checked={checked}
        disabled={loading}
        onChange={handleToggle}
      />
      This order is a gift
    </label>
  );
};

export default GiftCheckboxOrder;
