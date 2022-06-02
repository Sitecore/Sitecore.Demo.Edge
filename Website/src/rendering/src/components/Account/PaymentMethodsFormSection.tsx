import React, { useEffect, useState } from 'react';
import { Me } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';
import PaymentMethodsForm from '../Forms/PaymentMethodsForm';

const PaymentMethodsFormSection = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<DBuyerCreditCard>();

  const { paymentMethodId } = router.query;

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

  const handleSubmit = async (paymentMethod: DBuyerCreditCard) => {
    setLoading(true);
    if (paymentMethodId) {
      await Me.SaveCreditCard(String(paymentMethodId), paymentMethod);
    } else {
      await Me.CreateCreditCard(paymentMethod);
    }
    setLoading(false);
    router.push('/account/payment-methods');
  };

  return (
    <section className="shop-container section payment-methods-form-section">
      <h1>{title}</h1>
      <div className="form-wrapper">
        <PaymentMethodsForm
          creditCard={paymentMethod}
          isEditing={!!paymentMethodId}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default PaymentMethodsFormSection;
