import AttendeeRegistrationForm from './AttendeeRegistrationForm';
import TicketUpsell from './TicketUpsell';

const AttendeeForm = (): JSX.Element => (
  <div className="attendee-form">
    <div className="attendee-form-content">
      <TicketUpsell />
    </div>
    <div className="attendee-form-form">
      <AttendeeRegistrationForm />
    </div>
  </div>
);

export default AttendeeForm;
