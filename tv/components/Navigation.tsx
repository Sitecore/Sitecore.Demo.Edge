import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSchema } from '../api/queries/getSchema';
import { DayResult, VenueResult } from '../interfaces/schema';
import { TimeslotResult } from '../interfaces/timeslot';
import { dayDefaultValue, DayTimeContext, timeDefaultValue } from '../contexts/DayTimeContext';
import { contentHubImageLoader } from '../utilities/contentHubImageLoader';
import router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

type NavigationState = {
  days: DayResult[];
  times: TimeslotResult[];
  venues: VenueResult[];
};

const defaultNavigationState: NavigationState = {
  days: [],
  times: [],
  venues: [],
};

const Navigation = (): JSX.Element => {
  const dayTimeContext = useContext(DayTimeContext);
  const selectedDay = useRef(dayDefaultValue);
  const selectedTime = useRef(timeDefaultValue);
  const isSchemaFetched = useRef(false);
  const [schema, setSchema] = useState(defaultNavigationState);
  const refreshButtonState = dayTimeContext.isLoading ? 'loading' : '';

  useEffect(() => {
    if (!isSchemaFetched.current) {
      getSchema().then((schema) => {
        isSchemaFetched.current = true;

        setSchema({
          days: schema?.days,
          times: schema?.timeslots?.map((timeslot) => {
            return {
              ...timeslot,
              taxonomyLabel: {
                'en-US': timeslot.taxonomyLabel['en-US']
                  .slice(0, 7)
                  .replace('am', ' AM')
                  .replace('pm', ' PM'),
              },
            };
          }),
          venues: schema.venues,
        });
      });
    }
  });

  function getCurrentDisplayDay() {
    const filteredDays = schema.days.filter((day) => day.sortOrder == dayTimeContext.dayTime.day);

    if (filteredDays.length > 0) {
      return filteredDays[0].taxonomyName;
    }

    return '';
  }

  function getCurrentDisplayTime() {
    const filteredTimes = schema.times.filter(
      (time) => time.sortOrder === parseInt(dayTimeContext.dayTime.time)
    );

    if (filteredTimes.length > 0) {
      return filteredTimes[0].taxonomyLabel['en-US'];
    }

    return '';
  }

  function handleRoomChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedRoomId = e.target.value;
    if (selectedRoomId !== '0') {
      router.push(`/rooms/${selectedRoomId}`);
    }
  }

  function handleDayChange(e: ChangeEvent<HTMLSelectElement>) {
    const selection = e.target.value;
    if (selection !== '-1') {
      selectedDay.current = selection;
    }
  }

  function handleTimeChange(e: ChangeEvent<HTMLSelectElement>) {
    const selection = e.target.value;
    if (selection !== '-1') {
      selectedTime.current = selection;
    }
  }

  function handleRefreshClick() {
    // Set the context with new values
    dayTimeContext.setDayTime(selectedDay.current, selectedTime.current);
    // Remove the query string from the URL, if any.
    if (!!window.location.search) {
      router.push(window.location.pathname);
    }
  }

  function handleQuickRefreshClick() {
    // Reset the context with its actual values
    dayTimeContext.setDayTime(dayTimeContext.dayTime.day, dayTimeContext.dayTime.time);
  }

  return (
    <div className="menu">
      <div className="main-menu">
        <div className="menu-button toggle-button">+</div>
        <div className="menu-content">
          <div className="menu-logo">
            <Link href="/">
              <a>
                <Image
                  loader={contentHubImageLoader}
                  src="c78f4095acc746a98146aaa38f57a04f?v=cf5688ab"
                  layout="fixed"
                  width="336"
                  height="95"
                  alt="PLAY! Summit logo"
                />
              </a>
            </Link>
          </div>
          <div className="menu-navigation">
            {schema?.venues &&
              schema.venues.length > 0 &&
              schema.venues.map((venue, venueIndex) => (
                <div key={venueIndex}>
                  <div className="navigation-venue">
                    <Link href={`/venues/${venue.id}`}>
                      <a>{venue.name}</a>
                    </Link>
                  </div>
                  <select value="0" onChange={handleRoomChange}>
                    <option value="0">Choose a room...</option>
                    {venue.rooms.results
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((room, roomIndex) => (
                        <option key={roomIndex} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                  </select>
                </div>
              ))}
          </div>
          {schema?.days && schema.days.length > 0 && (
            <div className="menu-footer">
              <div className="daytime-columns">
                <div className="daytime-column">
                  <div className="daytime-current">{getCurrentDisplayDay()}</div>
                  <select name="day" onChange={handleDayChange}>
                    {schema.days.map((day, index) => (
                      <option key={index} value={day.sortOrder}>
                        {day.taxonomyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="daytime-column">
                  <div className="daytime-current">{getCurrentDisplayTime()}</div>
                  <select name="time" onChange={handleTimeChange}>
                    {schema?.times &&
                      schema.times.length > 0 &&
                      schema.times.map((time, index) => (
                        <option key={index} value={time.sortOrder}>
                          {time.taxonomyLabel['en-US']}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <button onClick={handleRefreshClick}>
                <FontAwesomeIcon className="icon" icon={faSyncAlt} />
                Refresh
              </button>
            </div>
          )}

          {!schema.days && (
            <div className="text-xl">
              There was a problem fetching the data needed to display here.
              <br />
              Please try again later.
            </div>
          )}
        </div>
      </div>
      <div
        className={'menu-button refresh-button ' + refreshButtonState}
        onClick={handleQuickRefreshClick}
      >
        <FontAwesomeIcon className="icon" icon={faSyncAlt} />
      </div>
    </div>
  );
};

export default Navigation;
