import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { addPromotion, removePromotion } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';

const PromoInput = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const dispatch = useAppDispatch();
  const { promotions } = useOcCurrentOrder();

  const handlePromoCodeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handlePromoCodeKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && promoCode) {
      setLoading(true);
      await dispatch(addPromotion(promoCode));
      setLoading(false);
      setPromoCode('');
    }
  };

  const handleRemovePromotion = async (promoCode: string) => {
    setLoading(true);
    await dispatch(removePromotion(promoCode));
    setLoading(false);
  };

  const addedPromotions = promotions?.length ? (
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
  ) : (
    ''
  );

  return (
    <div className="promo-input">
      <input
        type="text"
        disabled={!promotions}
        placeholder="Add promo or coupon code..."
        value={promoCode}
        onKeyDown={handlePromoCodeKeyDown}
        onChange={handlePromoCodeChange}
      />
      {addedPromotions}
    </div>
  );
};

export default PromoInput;
