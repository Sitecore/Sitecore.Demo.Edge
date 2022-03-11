import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { DOrder } from '../../models/ordercloud/DOrder';
import { patchOrder } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';

type GiftCheckboxOrderProps = {
  order: DOrder;
};

const GiftCheckboxOrder = (props: GiftCheckboxOrderProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(Boolean(props.order?.xp?.IsGift));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props?.order) {
      setChecked(Boolean(props?.order?.xp?.IsGift));
    }
  }, [props.order]);

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
  const labelId = 'gift-checkbox-order';

  return (
    <label htmlFor={labelId} className="gift-checkbox">
      <input
        id={labelId}
        type="checkbox"
        checked={checked}
        disabled={loading}
        onChange={handleToggle}
      />
      <span className="label-text">This order is a gift</span>
    </label>
  );
};

export default GiftCheckboxOrder;
