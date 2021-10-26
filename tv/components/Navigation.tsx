import Link from 'next/link';
import React from 'react';
import { getSchema } from '../api/queries/getSchema';
import { DayResult, VenueResult } from '../interfaces/schema';

interface NavigationState {
  days: DayResult[];
  venues: VenueResult[];
  day: string;
  time: string;
}

class Navigation extends React.Component<null, NavigationState> {
  state: Readonly<NavigationState> = {
    days: [],
    venues: [],
    day: '',
    time: '',
  };

  constructor(props: null) {
    super(props);
    this.state = {
      days: [],
      venues: [],
      day: '',
      time: '',
    };
  }

  componentDidMount() {
    getSchema().then((schema) => {
      this.setState({
        days: schema.days,
        venues: schema.venues,
      });
    });
  }

  handleDayChange(e: any) {
    console.log('handle Day Change');
    console.log('===========> ' + e.target.value);
    this.setState({ day: e.target.value });
    console.log(this.state);
  }

  handleTimeChange(e: any) {
    console.log('handle Time Change');
    console.log('===========> ' + e.target.value);
    this.setState({ time: e.target.value });
    console.log(this.state);

    //TODO: handle adding day and time to querystring here if we cant add the formatted url as the href in the link for the time link on line 108-ish
  }

  render(): JSX.Element {
    const selectedDay: DayResult = this.state.days.filter((d) => d.taxonomyName == this.state.day)
      ? this.state.days.filter((d) => d.taxonomyName == this.state.day)[0]
      : this.state.days[0];
    console.table(selectedDay);
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
                    <option key={index} value={day.taxonomyName}>
                      {day.taxonomyName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select value={this.state.time} onChange={this.handleTimeChange.bind(this)}>
                  {this.state.days.length > 0 &&
                    this.state.days[0].timeslotToDay.results.map((ts, index) => (
                      <option key={index} value={ts.taxonomyLabel['en-US']}>
                        {ts.taxonomyLabel['en-US']}
                      </option>
                    ))}
                </select>
              </div>
              <button>GO</button>
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
                    {day.timeslotToDay.results.map((ts, i) => {
                      return (
                        <li key={i}>
                          <a className="item-link bg-gray-light text-black">
                            {ts.taxonomyLabel['en-US']}
                          </a>
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
