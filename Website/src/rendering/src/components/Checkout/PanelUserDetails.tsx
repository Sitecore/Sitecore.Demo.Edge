type guestEmailProps = {
  email?: string;
  setOrderEmail: (email: string) => void;
};

const PanelUserDetails = (props: guestEmailProps): JSX.Element => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>User details</h2>
      </div>
      <div className="panel-body">
        <form className="form">
          <div>
            <label htmlFor="user-email">
              Your email is required for us to send you the invoice
            </label>
            <input
              name="user-email"
              id="user-email"
              type="email"
              defaultValue={props.email ? props.email : ''}
              required
              onBlur={(event) => props.setOrderEmail(event.target.value)}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PanelUserDetails;
