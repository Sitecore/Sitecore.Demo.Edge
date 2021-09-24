import React from 'react';
import Ticket from './Ticket';
import { TICKETS } from '../models/mock-tickets';
import Link from 'next/link';

interface TicketTiersState {
  selectedTicket: string;
}

class TicketTiers extends React.Component {
  state: Readonly<TicketTiersState> = {
    selectedTicket: '',
  };

  constructor(props: Record<string, unknown>) {
    super(props);
  }

  handleClick = (ticketId: string) => {
    this.setState({
      selectedTicket: ticketId,
    });
  };

  getActiveCssClass = (ticketId: string): string => {
    if (!this.state.selectedTicket) {
      return '';
    }
    return this.state.selectedTicket === ticketId ? 'active' : 'inactive';
  };

  render() {
    return (
      <div className="tickets">
        <div className="title">Select your ticket</div>
        <div className="section__tickets">
          <Ticket
            ticket={TICKETS[0]}
            color="pink"
            activeCssClass={this.getActiveCssClass('0')}
            onClick={this.handleClick}
          />
          <Ticket
            ticket={TICKETS[1]}
            color="orange"
            activeCssClass={this.getActiveCssClass('1')}
            onClick={this.handleClick}
          />
          <Ticket
            ticket={TICKETS[2]}
            color="blue"
            activeCssClass={this.getActiveCssClass('2')}
            onClick={this.handleClick}
          />
        </div>
        <div className="btn__area">
          <Link href="/">
            <a className="btn--main btn--main--round btn--main--big">Previous</a>
          </Link>
          <Link href={`/payment/${this.state.selectedTicket}`} passHref>
            <a className="btn--main btn--main--round btn--main--big btn-right">Continue</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default TicketTiers;
