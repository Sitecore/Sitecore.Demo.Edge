import Link from 'next/link';
import React, { ChangeEvent } from 'react';
import { getSchema } from '../api/queries/getSchema';
import { DayResult, VenueResult } from '../interfaces/schema';
import { TimeslotResult } from '../interfaces/timeslot';
import {
  dayDefaultValue,
  DayTimeContext,
  SetDayTimeFunction,
  timeDefaultValue,
} from '../contexts/DayTimeContext';

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
      day: dayDefaultValue,
      time: timeDefaultValue,
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
  }

  handleTimeChange(e: ChangeEvent<HTMLSelectElement>) {
    this.setState({ time: e.target.value });
  }

  // eslint-disable-next-line no-unused-vars
  setDayAndTime(setDayTime: SetDayTimeFunction) {
    setDayTime(this.state.day, this.state.time);
  }

  render(): JSX.Element {
    return (
      <DayTimeContext.Consumer>
        {({ dayTime, setDayTime }) => (
          <div className="menu">
            <div className="menu-button">+ </div>
            <div className="menu-content space-y-6">
              <div>
                <h2>Current Day: {dayTime.day}</h2>
                <h2>Current Time: {dayTime.time}</h2>
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
                  <button
                    onClick={this.setDayAndTime.bind(this, setDayTime)}
                    className="bg-black text-white"
                  >
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
        )}
      </DayTimeContext.Consumer>
    );
  }
}

export default Navigation;
