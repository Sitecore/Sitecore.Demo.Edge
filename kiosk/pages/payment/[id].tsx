import PaymentForm from '../../components/PaymentForm';
import { TICKETS } from '../../models/mock-tickets';
import { Ticket } from '../../models/ticket';
import Screen from '../../components/Screen';

export interface Params {
  id: string;
}

export declare type PaymentParams = {
  [param: string]: Params;
};

export default function Payment(ticket: Ticket) {
  return (
    <Screen>
      <PaymentForm ticket={ticket}></PaymentForm>
    </Screen>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on tickets
  const paths = TICKETS.map((ticket) => ({
    params: { id: ticket.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export const getStaticProps = async ({ params }: PaymentParams) => {
  for (const key in TICKETS) {
    const ticket = TICKETS[key];
    if (ticket.id === params.id) {
      return { props: ticket };
    }
  }

  return {};
};
