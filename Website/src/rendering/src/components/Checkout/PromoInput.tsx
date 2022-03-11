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
    <ul>
      {promotions.map((promotion) => {
        return (
          <li key={promotion.ID}>
            <button disabled={loading} onClick={() => handleRemovePromotion(promotion.Code)}>
              Remove Promotion
            </button>
            <span>{promotion.Code}</span>
            <span>{promotion.Description}</span>
            <span>{promotion.Amount}</span>
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
