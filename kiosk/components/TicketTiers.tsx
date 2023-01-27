import React from 'react';
import Ticket from './Ticket';
import { TICKETS } from '../models/mock-tickets';
import Link from 'next/link';
import Router from 'next/router';

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
            activeCssClass={this.getActiveCssClass('0')}
            onClick={this.handleClick}
          />
          <Ticket
            ticket={TICKETS[1]}
            activeCssClass={this.getActiveCssClass('1')}
            onClick={this.handleClick}
          />
          <Ticket
            ticket={TICKETS[2]}
            activeCssClass={this.getActiveCssClass('2')}
            onClick={this.handleClick}
          />
        </div>
        <div className="tickets__buttons">
          <span
            className="btn--main btn--main--round btn--main--secondary btn--main--big"
            onClick={() => Router.back()}
          >
            Previous
          </span>
          {this.state.selectedTicket ? (
            <Link
              href={`/payment/${this.state.selectedTicket}`}
              passHref
              className="btn--main btn--main--round btn--main--primary btn--main--big btn-right"
            >
              Continue
            </Link>
          ) : (
            <a className="btn--main btn--main--round btn--main--primary btn--main--big btn-right btn--disabled">
              Continue
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default TicketTiers;
