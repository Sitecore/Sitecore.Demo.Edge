import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { identifyVisitor } from '../../services/IdentificationService';
import { getUserData } from '../../helpers/GuestDataHelper';

const SponsorizeForm = (): JSX.Element => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const setUserData = async () => {
      const userData = await getUserData();

      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
    };

    setUserData();
  }, []);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert('First Name, Last Name, and Email form fields must be filled.');
      return;
    }

    return await identifyVisitor(email, firstName, lastName, phoneNumber).then(() => {
      setIsFormSubmitted(true);
    });
  };

  const form = (
    <>
      <div className="inline-fields">
        <div className="floating-label-wrap">
          <input
            type="text"
            placeholder="First Name *"
            id="firstName"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="firstName">First Name *</label>
        </div>
        <div className="floating-label-wrap">
          <input
            type="text"
            placeholder="Last Name *"
            id="lastName"
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name *</label>
        </div>
      </div>
      <div className="inline-fields">
        <div className="floating-label-wrap">
          <input
            type="text"
            placeholder="Email *"
            id="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email *</label>
        </div>
        <div className="floating-label-wrap">
          <input type="text" placeholder="Company" id="company" autoComplete="organization" />
          <label htmlFor="company">Company</label>
        </div>
      </div>
      <div className="inline-fields">
        <div className="floating-label-wrap">
          <input
            type="text"
            placeholder="Job Title"
            id="jobTitle"
            autoComplete="organization-title"
          />
          <label htmlFor="jobTitle">Job Title</label>
        </div>
        <div className="floating-label-wrap">
          <input
            type="text"
            placeholder="Phone Number"
            id="phoneNumber"
            autoComplete="tel"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label htmlFor="phoneNumber">Phone Number</label>
        </div>
      </div>
      <div className="button-area">
        <button className="btn-main" type="submit">
          Submit
        </button>
      </div>
      <div className="footnote">
        <p>
          Already have an account? <Link href="#">Log in.</Link>
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
      <p>Thank you for your interest in becoming a sponsor.</p>
      <p>A PLAY! Summit representative will contact you within 1 business day.</p>
    </>
  );

  const formContent = isFormSubmitted ? thankYouMessage : form;

  return (
    <form className="form request-info-form" onSubmit={handleFormSubmit}>
      {formContent}
    </form>
  );
};

export default SponsorizeForm;
