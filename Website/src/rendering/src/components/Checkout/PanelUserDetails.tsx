import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { patchOrder } from '../../redux/ocCurrentCart';
const PanelUserDetails = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleUpdateEmail = async (email: string) => {
    await dispatch(patchOrder({ xp: { GuestUserEmail: email } }));
  };

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
              required
              // TODO: Investigate if we need to disable the "Review order" button while the email is being saved
              onBlur={(event) => handleUpdateEmail(event.target.value)}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PanelUserDetails;
