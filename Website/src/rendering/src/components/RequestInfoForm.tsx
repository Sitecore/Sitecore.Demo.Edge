import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import { Component } from 'react';

interface RequestInfoFormState {
  isFormSubmitted: boolean;
}

class RequestInfoForm extends Component<ComponentProps, RequestInfoFormState> {
  state: Readonly<RequestInfoFormState> = {
    isFormSubmitted: false,
  };

  constructor(props: ComponentProps) {
    super(props);

    // Binding this keyword
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(): void {
    this.setState({
      isFormSubmitted: true,
    });
  }

  render(): JSX.Element {
    const form = (
      <>
        <div className="inline-fields">
          <div className="floating-label-wrap">
            <input type="text" placeholder="First Name" id="firstName" />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="floating-label-wrap">
            <input type="text" placeholder="Last Name" id="lastName" />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        <div className="inline-fields">
          <div className="floating-label-wrap">
            <input type="text" placeholder="Email" id="email" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="floating-label-wrap">
            <input type="text" placeholder="Company" id="company" />
            <label htmlFor="company">Company</label>
          </div>
        </div>
        <div className="inline-fields">
          <div className="floating-label-wrap">
            <input type="text" placeholder="Job Title" id="jobTitle" />
            <label htmlFor="jobTitle">Job Title</label>
          </div>
          <div className="floating-label-wrap">
            <input type="text" placeholder="Phone Number" id="phoneNumber" />
            <label htmlFor="phoneNumber">Phone Number</label>
          </div>
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
          <button className="btn--main btn--main--round" onClick={this.onSubmit}>
            Submit
          </button>
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
      </>
    );

    const thankYouMessage = (
      <>
        Thank you for your request for information. A PLAY! Summit representative will contact you
        in the near future.
      </>
    );

    return (
      <div className="form request-info-form">
        {this.state.isFormSubmitted ? thankYouMessage : form}
      </div>
    );
  }
}

export default RequestInfoForm;
