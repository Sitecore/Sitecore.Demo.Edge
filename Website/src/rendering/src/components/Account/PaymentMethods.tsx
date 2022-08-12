import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Me } from 'ordercloud-javascript-sdk';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';
import { getCreditCardExpirationDate } from '../../helpers/DateHelper';
import { DMeUser } from '../../models/ordercloud/DUser';

const PaymentMethods = (): JSX.Element => {
  const [paymentMethods, setPaymentMethods] = useState<DBuyerCreditCard[]>([]);
  const [user, setUser] = useState<DMeUser>();

  const meUser = async () => {
    const me = await Me.Get();
    setUser(me);
  };

  const getPaymentMethods = async () => {
    const cards = await Me.ListCreditCards();
    setPaymentMethods(cards.Items);
  };

  useEffect(() => {
    meUser();
    getPaymentMethods();
  }, []);

  const editablePaymentMethods = paymentMethods
    ? paymentMethods.filter((paymentMethod) => paymentMethod.Editable)
    : [];

  const noPaymentMethods = editablePaymentMethods.length === 0 && (
    <div>You have no saved payment methods yet.</div>
  );

  const handlePaymentMethodDelete = async (id: string) => {
    await Me.DeleteCreditCard(id);
    getPaymentMethods();
  };

  const getDefaultBanner = (card: DBuyerCreditCard) => {
    const isDefault = card.ID === user?.xp?.DefaultCreditCardID;
    const isExpired = new Date(card.ExpirationDate) < new Date();

    if (isDefault && isExpired) {
      return <span className="default-banner bg-pink">Default and expired</span>;
    } else if (isDefault) {
      return <span className="default-banner bg-blue">Default</span>;
    } else if (isExpired) {
      return <span className="default-banner bg-pink">Expired</span>;
    } else {
      return null;
    }
  };

  const paymentMethodsList = editablePaymentMethods.length > 0 && (
    <ul>
      {editablePaymentMethods.map((paymentMethod) => {
        return (
          <li key={paymentMethod.ID}>
            <div className="payment-methods-item">
              <div className="payment-methods-item-content">
                <p className="title">{paymentMethod.CardType}</p>
                {getDefaultBanner(paymentMethod)}
                <p>{paymentMethod.CardholderName}</p>
                <p>Credit card ending in: •••• {paymentMethod.PartialAccountNumber}</p>
                <p>Expires on: {getCreditCardExpirationDate(paymentMethod.ExpirationDate)}</p>
              </div>
              <div className="payment-methods-item-actions">
                <button
                  className="payment-methods-delete"
                  aria-label="Delete Payment Method"
                  type="button"
                  onClick={() => handlePaymentMethodDelete(paymentMethod.ID)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <Link href={`/account/payment-methods/${paymentMethod.ID}`}>
                  <a className="payment-methods-edit" title="Edit Payment Method">
                    <FontAwesomeIcon icon={faEdit} />
                  </a>
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className="payment-methods shop-container section">
      <div className="payment-methods-header">
        <h1>Payment methods</h1>
        <Link href="/account/payment-methods/create">
          <a className="btn-main">Add new payment method</a>
        </Link>
      </div>
      <div className="payment-methods-grid">
        {noPaymentMethods}
        {paymentMethodsList}
      </div>
    </section>
  );
};

export default PaymentMethods;
