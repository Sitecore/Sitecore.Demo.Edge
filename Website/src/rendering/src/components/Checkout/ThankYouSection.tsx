import Link from 'next/link';

const ThankYouSection = (): JSX.Element => (
  <section className="shop-section thank-you-section">
    <h1 className="thank-you-title">Thank you for your purchase!</h1>
    <p>Login or create an account to save your order summary</p>
    <Link href="/account/login">
      <a className="btn--main btn--main--round">Log in / Create Account</a>
    </Link>
  </section>
);

export default ThankYouSection;
