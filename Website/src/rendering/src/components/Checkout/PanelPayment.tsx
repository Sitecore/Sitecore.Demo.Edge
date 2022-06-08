import CreditCardForm from '../../components/Forms/CreditCardForm';
import { useEffect, useState } from 'react';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';
import { retrievePayments, updateCreditCardPayment } from '../../redux/ocCurrentCart';
import { useAppDispatch } from '../../redux/store';
import CreditCardCard from './CreditCardCard';

const PanelPayment = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { order, payments } = useOcCurrentCart();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullCardNumber, setFullCardNumber] = useState('');
  const defaultButerCreditCard: DBuyerCreditCard = undefined;
  const [editedCreditCard, setEditedCreditCard] = useState(defaultButerCreditCard);

  useEffect(() => {
    if (order) {
      dispatch(retrievePayments(order.ID));
    }
  }, [order, dispatch]);

  const handleUpdateCreditCardPayment = async (
    creditCard: DBuyerCreditCard,
    fullCardNumber: string
  ) => {
    setLoading(true);
    await dispatch(updateCreditCardPayment(creditCard));
    setEditedCreditCard(creditCard);
    setLoading(false);
    setIsEditing(false);
    setFullCardNumber(fullCardNumber);
  };

  // ordercloud supports multiple payments, for this demo we allow only a single payment per order
  const payment = payments?.length ? payments[0] : null;

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const creditCardToDisplay = editedCreditCard || payment?.xp?.CreditCard;
  const creditCardDisplay =
    creditCardToDisplay && !isEditing ? (
      <CreditCardCard
        creditCard={creditCardToDisplay}
        editable={true}
        onEdit={() => setIsEditing(true)}
      />
    ) : (
      <CreditCardForm
        creditCard={creditCardToDisplay}
        onSubmit={handleUpdateCreditCardPayment}
        isEditing={isEditing}
        onCancelEdit={handleCancelEdit}
        loading={loading}
        fullCardNumber={fullCardNumber}
      />
    );

  return (
    <div className="panel">
      <div className="panel-header">
        <p>Payment</p>
      </div>
      <div className="panel-body">{creditCardDisplay}</div>
    </div>
  );
};

export default PanelPayment;
