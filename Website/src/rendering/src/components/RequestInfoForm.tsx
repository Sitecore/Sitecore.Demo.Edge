import Link from 'next/link';

const RequestInfoForm = (): JSX.Element => (
  <div className="section__content text-white">
    <h2 className="text-blue uppercase">Request Further information:</h2>
    <div className="flex w-2/3 gap-10 pt-10">
      <input
        className="w-full rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="First Name"
      />
      <input
        className="w-full rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Last Name"
      />
    </div>
    <div className="flex w-2/3 gap-10 pt-4">
      <input
        className="w-full rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Email"
      />
      <input
        className="w-full rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Company"
      />
    </div>
    <div className="flex w-2/3 gap-10 pt-4">
      <input
        className="w-full rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Job Title"
      />
      <input
        className="w-full rounded p-2 border border-white-dark text-sm font-medium"
        type="text"
        placeholder="Contact no"
      />
    </div>
    <div className="flex w-2/3 gap-10 pt-4">
      <div className="w-full">
        <label className="inline-flex items-center pl-5">
          <input type="checkbox" className="form-checkbox align-top inline-block" />
          <span className="ml-2 text-sm">If you wish to receive updates on the expo</span>
        </label>

        <label className="inline-flex items-center pl-5">
          <input type="checkbox" className="form-checkbox align-top inline-block" />
          <span className="ml-2 text-sm">
            If you wish to receive updates from third party vendors and promotions
          </span>
        </label>
      </div>
      <div className="w-full text-sm">
        <div className="pt-4 pb-10">
          <Link href="/tickets">
            <a className="btn--main btn--main--round">Submit</a>
          </Link>
        </div>
        <p className="text-sm">
          Already have an account?
          <strong>
            <u>Log in.</u>
          </strong>
          <br />
          <br />
        </p>
        <p className="text-sm">
          To find out more about how we are using this information you are giving up, please review
          our <strong>privacy statement</strong>
        </p>
      </div>
    </div>
  </div>
);

export default RequestInfoForm;
