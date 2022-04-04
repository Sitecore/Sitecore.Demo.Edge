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
  useEffect(() => {
    if (order) {
      dispatch(retrievePayments(order.ID));
    }
  }, [order, dispatch]);

  const handleUpdateCreditCardPayment = (creditCard: DBuyerCreditCard) => {
    dispatch(updateCreditCardPayment(creditCard));
    setIsEditing(false);
  };

  // ordercloud supports multiple payments, for this demo we allow only a single payment per order
  const payment = payments?.length ? payments[0] : null;

  const creditCardDisplay =
    payment?.xp?.CreditCard && !isEditing ? (
      <CreditCardCard
        creditCard={payment?.xp?.CreditCard}
        editable={true}
        onEdit={() => setIsEditing(true)}
      />
    ) : (
      <CreditCardForm
        creditCard={payment?.xp?.CreditCard}
        onSubmit={handleUpdateCreditCardPayment}
      />
    );

  const cancelEditButton = isEditing && (
    <button onClick={() => setIsEditing(false)}>Cancel edit</button>
  );

  return (
    <div className="panel">
      <div className="panel-header">
        <p>Payment</p>
      </div>
      <div className="panel-body">
        {creditCardDisplay}
        {cancelEditButton}
      </div>
    </div>
  );
};

export default PanelPayment;
