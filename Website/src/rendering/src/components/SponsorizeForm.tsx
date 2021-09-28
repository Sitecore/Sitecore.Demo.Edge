import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import { Component } from 'react';

interface SponsorizeFormState {
  isFormSubmitted: boolean;
}

class SponsorizeForm extends Component<ComponentProps, SponsorizeFormState> {
  state: Readonly<SponsorizeFormState> = {
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
        Thank you for your interest in becoming a sponsor. <br /> A PLAY! Summit representative will
        contact you within 1 business day.
      </>
    );

    return (
      <div className="form request-info-form">
        {this.state.isFormSubmitted ? thankYouMessage : form}
      </div>
    );
  }
}

export default SponsorizeForm;
