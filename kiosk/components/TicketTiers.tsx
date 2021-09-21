import Ticket from './Ticket';
import { TICKETS } from '../models/mock-tickets';

const TicketTiers = (): JSX.Element => {
  return (
    <div className="min-h-full bg-black flex justify-center items-center py-20">
      <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
        <Ticket ticket={TICKETS[0]} />
        <Ticket ticket={TICKETS[1]} />
        <Ticket ticket={TICKETS[2]} />
      </div>
    </div>
  );
};

export default TicketTiers;
