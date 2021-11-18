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

  handleRoomChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedRoomId = e.target.value;
    if (selectedRoomId !== '0') {
      // TODO: Navigate to room (`/rooms/${selectedRoomId}`)
      console.log(selectedRoomId);
    }
  }

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
              <div className="menu-navigation">
                {this.state.venues.map((venue, venueIndex) => (
                  <div key={venueIndex}>
                    <div className="navigation-venue">
                      <Link href={`/venues/${venue.id}`}>
                        <a>{venue.name}</a>
                      </Link>
                    </div>
                    <select value="0" onChange={this.handleRoomChange.bind(this)}>
                      <option value="0">Choose a room...</option>
                      {venue.rooms.results.map((room, roomIndex) => (
                        <option key={roomIndex} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="menu-footer">
                <div className="daytime-columns">
                  <div className="daytime-column">
                    <div className="daytime-current">Day {dayTime.day}</div>
                    <select name="day" onChange={this.handleDayChange.bind(this)}>
                      <option value="-1">Select day...</option>
                      {this.state.days.map((day, index) => (
                        <option key={index} value={day.sortOrder}>
                          {day.taxonomyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="daytime-column">
                    <div className="daytime-current">{dayTime.time}:00 AM</div>
                    <select name="time" onChange={this.handleTimeChange.bind(this)}>
                      <option value="-1">Select time...</option>
                      {this.state.times.length > 0 &&
                        this.state.times.map((ts, index) => (
                          <option key={index} value={ts.sortOrder}>
                            {ts.taxonomyLabel['en-US']
                              .slice(0, 7)
                              .replace('am', ' AM')
                              .replace('pm', ' PM')}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <button onClick={this.setDayAndTime.bind(this, setDayTime)}>Set</button>
              </div>
            </div>
          </div>
        )}
      </DayTimeContext.Consumer>
    );
  }
}

export default Navigation;
