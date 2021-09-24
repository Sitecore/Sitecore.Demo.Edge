import Link from 'next/link';

const AttendeeForm = (): JSX.Element => (
  <div className="form attendee-registration-form">
    <h2>Attendee Registration</h2>
    <div className="floating-label-wrap">
      <input type="text" placeholder="First Name" id="firstName" />
      <label htmlFor="firstName">First Name</label>
    </div>
    <div className="floating-label-wrap">
      <input type="text" placeholder="Last Name" id="lastName" />
      <label htmlFor="lastName">Last Name</label>
    </div>
    <div className="floating-label-wrap">
      <input type="text" placeholder="Email" id="email" />
      <label htmlFor="email">Email</label>
    </div>
    {/* TODO: Implement later when registration is setup
    <div className="floating-label-wrap">
      <input type="password" placeholder="Password" id="password" />
      <label htmlFor="password">Password</label>
    </div> */}
    <label className="checkbox-label">
      <input type="checkbox" defaultChecked={false} />
      <span className="label-text">I wish to receive updates on the expo</span>
    </label>
    <label className="checkbox-label">
      <input type="checkbox" defaultChecked={false} />
      <span className="label-text">
        I wish to receive updates from third party vendors and promotions
      </span>
    </label>
    <div className="button-area">
      <Link href="/tickets/payment">
        <a className="btn--main btn--main--round">Next</a>
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

export default AttendeeForm;
