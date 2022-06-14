import React, { useEffect, useState } from 'react';
import { Me } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';
import PaymentMethodsForm from '../Forms/PaymentMethodsForm';
import { DMeUser } from 'src/models/ordercloud/DUser';

const PaymentMethodsFormSection = (): JSX.Element => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<DBuyerCreditCard>();
  const [user, setUser] = useState<DMeUser>();

  const { paymentMethodId } = router.query;

  const getUser = async () => {
    const me = await Me.Get();
    setUser(me);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const getPaymentMethod = async () => {
      const paymentMethodToEdit = await Me.GetCreditCard(String(paymentMethodId));
      setPaymentMethod(paymentMethodToEdit);
    };

    if (paymentMethodId) {
      getPaymentMethod();
    }
  }, [paymentMethodId]);

  const title = paymentMethodId ? 'Edit payment method' : 'Create a new payment method';

  return (
    <section className="shop-container section payment-methods-form-section">
      <h1>{title}</h1>
      <div className="form-wrapper">
        <PaymentMethodsForm creditCard={paymentMethod} user={user} isEditing={!!paymentMethodId} />
      </div>
    </section>
  );
};

export default PaymentMethodsFormSection;
