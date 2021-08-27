import Link from 'next/link';

const AttendeeRegistrationForm = (): JSX.Element => (
  <div className="form attendee-registration-form">
    <h2>Attendee Registration</h2>
    <input type="text" placeholder="First name" />
    <input type="text" placeholder="Last name" />
    <input type="text" placeholder="Email" />
    <input type="text" placeholder="Password" />
    <label className="checkbox-label">
      <input type="checkbox" defaultChecked />
      <span className="label-text">If you wish to receive updates on the expo</span>
    </label>
    <label className="checkbox-label">
      <input type="checkbox" defaultChecked />
      <span className="label-text">
        If you wish to receive updates from third party vendors and promotions
      </span>
    </label>
    <div className="button-area">
      <Link href="/tickets/payment">
        <a className="btn--main btn--main--round">Submit</a>
      </Link>
    </div>
    <div className="footnote">
      <p>
        Already have an account? <Link href="/account/login">Log in.</Link>
      </p>
      <p>
        To find out more about how we are using this information you are giving up, please review
        our <Link href="/privacy">privacy statement</Link>
      </p>
    </div>
  </div>
);

export default AttendeeRegistrationForm;
