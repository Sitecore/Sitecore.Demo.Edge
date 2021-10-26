import React from 'react';
import { getRooms } from '../api/queries/getRooms';
import { getSchema } from '../api/queries/getSchema';
import { Room } from '../interfaces/room';
import { DayResult, DayResults } from '../interfaces/schema';

interface NavigationState {
  days: DayResult[];
}

class Navigation extends React.Component<null, NavigationState> {
  state: Readonly<NavigationState> = {
    days: [],
  };

  constructor(props: null) {
    super(props);
    this.state = {
      days: [],
    };
  }

  componentDidMount() {
    getSchema().then((schema) => {
      this.setState({
        days: schema.days,
      });
    });
  }

  render(): JSX.Element {
    console.table(this.state.days);
    return (
      <div className="menu">
        <div className="menu-button">+ </div>

        <div className="menu-content">
          <ul>
            {this.state.days.map((day, index) => (
              <li key={index}>
                {day.taxonomyName}
                <ul>
                  {day.timeslotToDay.results.map((ts, i) => (
                    <li key={i}>{ts.taxonomyLabel['en-US']}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Navigation;
