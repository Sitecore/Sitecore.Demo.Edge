import Link from 'next/link';

const AttendeeForm = (): JSX.Element => (
  <div className="section grid grid-cols-12 gap-4 w-full">
    <div className="section__content col-span-5 text-center">
      <h2>Attendee Benefits</h2>
      <ul>
        <li>10% off workshops</li>
        <li>Free speaker events</li>
        <li>Discounts on thousands of products</li>
        <li>Free online catalog</li>
        <li>20% off VIP upgrade</li>
      </ul>
      <a className="btn--main btn--main--round btn--main--big" href="/">
        VIP Upgrade
      </a>
    </div>
    <div className="col-span-7">
      <h2>Attendee Registration</h2>
      <input
        className="w-full md:w-3/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="First name"
      />
      <input
        className="w-full md:w-3/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Last name"
      />
      <input
        className="w-full md:w-3/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Email"
      />
      <input
        className="w-full md:w-3/5 rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Password"
      />
      <label className="inline-flex items-center pl-5">
        <input type="checkbox" className="form-checkbox" defaultChecked />
        <span className="ml-2 text-sm">If you wish to receive updates on the expo</span>
      </label>
      <label className="inline-flex items-center pl-5">
        <input type="checkbox" className="form-checkbox" defaultChecked />
        <span className="ml-2 text-sm">
          If you wish to receive updates from third party vendors and promotions
        </span>
      </label>
      <div className="px-6 pt-4 pb-10">
        <Link href="/tickets">
          <a className="btn--main btn--main--round">Submit</a>
        </Link>
      </div>
      <p>
        Already have an account?{' '}
        <strong>
          <u>Log in.</u>
        </strong>
      </p>
      <p>
        To find out more about how we are using this information you are giving up, please review
        our <strong>privacy statement</strong>
      </p>
    </div>
  </div>
);

export default AttendeeForm;
