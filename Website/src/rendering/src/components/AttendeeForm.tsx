import Link from 'next/link';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AttendeeForm = (): JSX.Element => (
  <div className="grid justify-items-stretch w-full grid-cols-1 md:grid-cols-5 attendee-form gap-0 md:gap-10">
    <div className="section__content--top text-center space-y-10 attendee-form-content col-span-2 bg-white-lighter p-10">
      <div>
        <h2 className="text-4xl px-4">VIP Ticket</h2>
        <span>Save 20% with early bird!</span>
      </div>
      <ul>
        <li>
          <FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> 10% off workshops
        </li>
        <li>
          <FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> Free speaker events
        </li>
        <li>
          <FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> Discounts on thousands of
          products
        </li>
        <li>
          <FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> Free online catalog
        </li>
        <li>
          <FontAwesomeIcon className="text-pink mr-3" icon={faCheck} /> 20% off VIP upgrade
        </li>
      </ul>
      <div className="px-6 pt-4 pb-10">
        <Link href="/tickets">
          <a className="btn--main btn--main--round">VIP Upgrade</a>
        </Link>
      </div>
    </div>
    <div className="section__content--top attendee-form-form col-span-3 space-y-5  p-10">
      <h2 className="text-4xl">Attendee Registration</h2>
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
        <Link href="/tickets/payment">
          <a className="btn--main btn--main--round">Submit</a>
        </Link>
      </div>
      <div className="text-sm">
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
  </div>
);

export default AttendeeForm;
