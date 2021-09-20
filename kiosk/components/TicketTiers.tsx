import Ticket from './Ticket';

const TicketTiers = (): JSX.Element => {
  return (
    <div className="min-h-full bg-black flex justify-center items-center py-20">
      <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
        <Ticket
          name="Online Ticket"
          pass="Digital Pass"
          price="99$"
          thumbnail="/tickets/ticket1.jpg"
        />
        <Ticket
          name="Regular Ticket"
          pass="Standard Pass"
          price="199$"
          thumbnail="/tickets/ticket2.jpg"
        />
        <Ticket
          name="Online Ticket"
          pass="All access VIP pass"
          price="399$"
          thumbnail="/tickets/ticket3.jpg"
        />
      </div>
    </div>
  );
};

export default TicketTiers;
