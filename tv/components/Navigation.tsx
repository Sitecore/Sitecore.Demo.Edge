import Link from 'next/link';
import React, { ChangeEvent } from 'react';
import { getSchema } from '../api/queries/getSchema';
import { DayResult, VenueResult } from '../interfaces/schema';
import { setQueryStringValue } from '../utilities/queryString';
import Router from 'next/router';
import { TimeslotResult } from '../interfaces/timeslot';

interface NavigationState {
  days: DayResult[];
  times: TimeslotResult[];
  venues: VenueResult[];
  day: string;
  time: string;
}

class Navigation extends React.Component<unknown, NavigationState> {
  state: Readonly<NavigationState> = {
    days: [],
    times: [],
    venues: [],
    day: '',
    time: '',
  };

  constructor(props: unknown) {
    super(props);
    this.state = {
      days: [],
      times: [],
      venues: [],
      day: '',
      time: '',
    };
  }

  componentDidMount() {
    getSchema().then((schema) => {
      this.setState({
        days: schema.days,
        times: schema.timeslots,
        venues: schema.venues,
      });
    });
  }

  handleDayChange(e: ChangeEvent<HTMLSelectElement>) {
    this.setState({ day: e.target.value });
    setQueryStringValue('day', e.target.value);
  }

  handleTimeChange(e: ChangeEvent<HTMLSelectElement>) {
    this.setState({ time: e.target.value });
    setQueryStringValue('time', e.target.value);
  }

  refreshPage() {
    //Router.reload(window.location.pathname);
    Router.reload();
  }

  render(): JSX.Element {
    return (
      <div className="menu">
        <div className="menu-button">+ </div>
        <div className="menu-content space-y-6">
          <div>
            <h2>Current Time: </h2>Aug 29th, 11:11 am
          </div>
          <div>
            <div>
              <h2>Select Day and Time</h2>
              <div>
                <select value={this.state.day} onChange={this.handleDayChange.bind(this)}>
                  {this.state.days.map((day, index) => (
                    <option key={index} value={day.sortOrder}>
                      {day.taxonomyName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select value={this.state.time} onChange={this.handleTimeChange.bind(this)}>
                  {this.state.times.length > 0 &&
                    this.state.times.map((ts, index) => (
                      <option key={index} value={ts.sortOrder}>
                        {ts.taxonomyLabel['en-US']}
                      </option>
                    ))}
                </select>
              </div>
              <button onClick={this.refreshPage.bind(this)} className="bg-black text-white">
                GO
              </button>
            </div>
          </div>
          <div>
            <h2 className="item-title">Days</h2>
            <ul>
              {this.state.days.map((day, index) => (
                <li className="parent-link" key={index}>
                  <Link href={'/schedule/' + day.sortOrder} passHref>
                    <a className="item-link bg-black-light text-white">{day.taxonomyName}</a>
                  </Link>
                  <ul className="child-link">
                    {this.state.times.map((ts, i) => {
                      return (
                        <li className="item-link bg-gray-light text-black" key={i}>
                          {ts.taxonomyLabel['en-US']}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="item-title">Venues</h2>
            <ul>
              {this.state.venues.map((venue, index) => (
                <li className="parent-link" key={index}>
                  <Link href={'/venues/' + venue.id}>
                    <a className="item-link bg-black-light text-white">{venue.name}</a>
                  </Link>
                  <ul className="child-link">
                    {venue.rooms.results.map((room, i) => {
                      return (
                        <li key={i}>
                          <Link href={'/rooms/' + room.id}>
                            <a className="item-link bg-gray-light text-black">{room.name}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
