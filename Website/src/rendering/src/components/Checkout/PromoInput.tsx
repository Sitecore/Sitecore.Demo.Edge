import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { addPromotion, patchOrder, removePromotion } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';

type PromoResponse = {
  error?: {
    name?: string;
    message?: string;
  };
  meta?: unknown;
  payload?: unknown;
  type?: string;
};

const PromoInput = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const dispatch = useAppDispatch();
  const { promotions, order } = useOcCurrentCart();

  const handlePromoCodeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handlePromoCodeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleApplyPromotion();
    }
  };

  const handleApplyPromotion = async () => {
    if (promoCode) {
      setLoading(true);
      setPromoCode('');

      const res = (await dispatch(addPromotion(promoCode))) as PromoResponse;
      if (res?.error) {
        setPromoError(res?.error?.message || `${promoCode} is not a valid promo code`);
      } else {
        setPromoError('');
        await dispatch(patchOrder(order));
      }

      setLoading(false);
    }
  };

  const handleRemovePromotion = async (promoCode: string) => {
    setLoading(true);

    await dispatch(removePromotion(promoCode));
    await dispatch(patchOrder(order));

    setLoading(false);
  };

  const addedPromotions = promotions?.length > 0 && (
    <ul className="promotion-list">
      {promotions.map((promotion) => {
        return (
          <li key={promotion.ID} className="promotion">
            <div className="promotion-body">
              <span className="promotion-code">{promotion.Code}</span>
              <p className="promotion-desc">{promotion.Description}</p>
            </div>
            <span className="promotion-amount">-${promotion.Amount}</span>
            <button
              disabled={loading}
              onClick={() => handleRemovePromotion(promotion.Code)}
              className="promotion-remove"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="promo-input">
      <label htmlFor="promoInput">Add promo or coupon code...</label>
      <input
        id="promoInput"
        type="text"
        value={promoCode}
        onKeyDown={handlePromoCodeKeyDown}
        onChange={handlePromoCodeChange}
      />
      {promoError}
      {addedPromotions}
      <button
        disabled={loading || !promoCode}
        className="apply-promo-btn"
        onClick={handleApplyPromotion}
      >
        Apply promotion
      </button>
    </div>
  );
};

export default PromoInput;
