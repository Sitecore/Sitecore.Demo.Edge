import Link from 'next/link';

const RequestInfoForm = (): JSX.Element => (
  <div className="section__content form request-info-form">
    <h2>Request Further Information</h2>
    <div className="inline-fields">
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
    </div>
    <div className="inline-fields">
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Company" />
    </div>
    <div className="inline-fields">
      <input type="text" placeholder="Job Title" />
      <input type="text" placeholder="Contact no" />
    </div>
    <label className="checkbox-label">
      <input type="checkbox" />
      <span className="label-text">If you wish to receive updates on the expo</span>
    </label>
    <label className="checkbox-label">
      <input type="checkbox" />
      <span className="label-text">
        If you wish to receive updates from third party vendors and promotions
      </span>
    </label>
    <div className="button-area">
      <Link href="/tickets">
        <a className="btn--main btn--main--round">Submit</a>
      </Link>
    </div>
    <div className="footnote">
      <p>
        Already have an account? <Link href="/account/login">Log in.</Link>
      </p>
      <p>
        To find out more about how we are using this information you are giving up, please our{' '}
        <Link href="/privacy">privacy statement</Link>
      </p>
    </div>
  </div>
);

export default RequestInfoForm;
