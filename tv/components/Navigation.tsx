import Link from 'next/link';
import React from 'react';
import { getSchema } from '../api/queries/getSchema';
import { DayResult, VenueResult } from '../interfaces/schema';

interface NavigationState {
  days: DayResult[];
  venues: VenueResult[];
}

class Navigation extends React.Component<null, NavigationState> {
  state: Readonly<NavigationState> = {
    days: [],
    venues: [],
  };

  constructor(props: null) {
    super(props);
    this.state = {
      days: [],
      venues: [],
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

  render(): JSX.Element {
    console.table(this.state.days);
    return (
      <div className="menu">
        <div className="menu-button">+ </div>
        <div className="menu-content space-y-6">
          <div>
            <h2>Current Time: </h2>Aug 29th, 11:11 am
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
                          <Link href="/schedule/day/time">
                            <a className="item-link bg-gray-light text-black">
                              {ts.taxonomyLabel['en-US']}
                            </a>
                          </Link>
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
