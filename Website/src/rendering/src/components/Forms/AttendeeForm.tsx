import React, { FormEvent, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { identifyVisitor } from '../../services/CdpService';

const AttendeeForm = (): JSX.Element => {
  const ticketId =
    typeof window === 'undefined' ? '0' : new URLSearchParams(window.location.search).get('ticket');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert('All form fields must be filled.');
      return;
    }

    return await identifyVisitor(email, firstName, lastName).then(() => {
      Router.push(`/tickets/payment?ticket=${ticketId}`);
    });
  };

  return (
    <form className="form attendee-registration-form" onSubmit={handleFormSubmit}>
      <h2>Attendee Registration</h2>
      <div className="floating-label-wrap">
        <input
          type="text"
          placeholder="First Name"
          id="firstName"
          autoComplete="given-name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="firstName">First Name</label>
      </div>
      <div className="floating-label-wrap">
        <input
          type="text"
          placeholder="Last Name"
          id="lastName"
          autoComplete="family-name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
      </div>
      <div className="floating-label-wrap">
        <input
          type="text"
          placeholder="Email"
          id="email"
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <button className="btn--main btn--main--round" type="submit">
          Next
        </button>
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
    </form>
  );
};

export default AttendeeForm;
