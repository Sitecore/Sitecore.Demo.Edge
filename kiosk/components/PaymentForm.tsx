import Link from 'next/link';
import { Ticket } from '../models/ticket';
import TicketView from './Ticket';

type PaymentFormProps = {
  ticket: Ticket;
};

const PaymentForm = (props: PaymentFormProps): JSX.Element => {
  return (
    <div className="min-h-full checkout bg-black mx-auto flex flex-row">
      <div className="panel flex flex-1 flex-col md:flex-row shadow-lg">
        <div className="panel-left w-full md:w-2/3 bg-white rounded-l">
          <form action="#">
            <h1 className="text-3xl font-normal p-10 border-b border-solid border-grey-light">
              Checkout
            </h1>
            <div className="p-5 pt-8 border-b border-solid border-grey-light">
              <div className="mb-3 -mx-2 flex items-end">
                <div className="px-2 w-1/2">
                  <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">First Name</label>
                    <div>
                      <input
                        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="First Name"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">Last Name</label>
                    <div>
                      <input
                        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Last Name"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">Email</label>
                <div>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Email"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 pt-8 border-b border-solid border-grey-light">
              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                <div>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="0000 0000 0000 0000"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="pt-5">
              <Link href={'/payment/confirmed/' + props.ticket.id} passHref>
                <button className="btn--main btn--main--round btn--main--big block w-full max-w-xs mx-auto rounded-lg px-3 py-3">
                  <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="panel-right w-full md:w-1/3 rounded-r">
          <div className="p-10">
            <TicketView ticket={props.ticket} activeCssClass="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
