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
            <div className="menu-button">+</div>
            <div className="menu-content">
              {/* TODO: Replace the image with the proper one */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="p_logo_transparent.png" width="50" alt="PLAY! Summit logo" />
              <ul>
                {this.state.venues.map((venue, index) => (
                  <li className="list-item venue-item" key={index}>
                    <Link href={'/venues/' + venue.id}>
                      <a className="item-link venue-link">{venue.name}</a>
                    </Link>
                    <ul className="room-list">
                      {venue.rooms.results.map((room, i) => {
                        return (
                          <li className="list-item room-item" key={i}>
                            <Link href={'/rooms/' + room.id}>
                              <a className="item-link room-link">{room.name}</a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
              <div className="menu-footer">
                <div>
                  <h2>Current Day: {dayTime.day}</h2>
                  <h2>Current Time: {dayTime.time}</h2>
                </div>
                <div>
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
                  <button onClick={this.setDayAndTime.bind(this, setDayTime)}>Set</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DayTimeContext.Consumer>
    );
  }
}

export default Navigation;
