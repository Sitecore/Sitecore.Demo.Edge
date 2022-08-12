import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { DBuyerCreditCard } from '../../models/ordercloud/DCreditCard';
import Spinner from '../../components/ShopCommon/Spinner';
import { DMeUser } from '../../models/ordercloud/DUser';
import { Me } from 'ordercloud-javascript-sdk';
import { useRouter } from 'next/router';
import PaymentCardForm, { PaymentCardFormChangeHandler } from './PaymentCardForm';

type PaymentMethodsFormProps = {
  creditCard?: DBuyerCreditCard;
  user?: DMeUser;
  isEditing?: boolean;
};

const PaymentMethodsForm = (props: PaymentMethodsFormProps): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(
    !!props.user?.xp?.DefaultCreditCardID &&
      props?.creditCard?.ID === props?.user?.xp?.DefaultCreditCardID
  );

  const [creditCard, setCreditCard] = useState(props?.creditCard);

  useEffect(() => {
    setCreditCard(props?.creditCard);
    setDefaultPaymentMethod(
      !!props.user?.xp?.DefaultCreditCardID &&
        props?.creditCard?.ID === props?.user?.xp?.DefaultCreditCardID
    );
  }, [props?.creditCard, props?.user]);

  const handlePaymentCardFormChange: PaymentCardFormChangeHandler = ({ creditCard }) => {
    setCreditCard(creditCard);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const updatedCreditCard: DBuyerCreditCard = {
      ...(props.creditCard || {}),
      ...creditCard,
    };

    let newCC;

    if (props.isEditing) {
      newCC = await Me.SaveCreditCard(String(updatedCreditCard.ID), updatedCreditCard);
    } else {
      newCC = await Me.CreateCreditCard(updatedCreditCard);
    }

    let updatedUser: DMeUser = {
      ...(props.user || {}),
    };

    if (defaultPaymentMethod) {
      updatedUser = {
        ...updatedUser,
        xp: {
          ...updatedUser.xp,
          DefaultCreditCardID: newCC.ID,
        },
      };
    } else if (
      !defaultPaymentMethod &&
      props.user?.xp?.DefaultCreditCardID === props.creditCard?.ID
    ) {
      updatedUser = {
        ...updatedUser,
        xp: {
          ...updatedUser.xp,
          DefaultCreditCardID: null,
        },
      };
    }

    await Me.Patch(updatedUser);
    setLoading(false);

    router.push('/account/payment-methods');
  };

  const cancelEditButton = props.isEditing && (
    <Link href="/account/payment-methods">
      <a className="cancel-edit">Cancel</a>
    </Link>
  );

  const submitBtnText = props?.creditCard?.ID ? 'Apply changes' : 'Create payment method';

  return (
    <form onSubmit={handleFormSubmit} className="form creditcard-form">
      <PaymentCardForm creditCard={props.creditCard} onChange={handlePaymentCardFormChange} />
      <div>
        <input
          type="checkbox"
          id="default-payment-method"
          autoComplete="default-payment-method"
          onChange={(e) => setDefaultPaymentMethod(e.target.checked)}
          checked={defaultPaymentMethod}
        />
        <label htmlFor="default-payment-method">Set as default payment method</label>
      </div>
      <div className="button-area">
        {cancelEditButton}
        <button className="btn-main" type="submit" disabled={loading}>
          <Spinner loading={loading} /> {submitBtnText}
        </button>
      </div>
    </form>
  );
};

export default PaymentMethodsForm;
