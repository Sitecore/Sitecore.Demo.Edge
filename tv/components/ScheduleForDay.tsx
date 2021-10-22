import ScheduleRow from './ScheduleRow';
import { Day, ScheduleSlot } from '../interfaces/session';
import { Carousel } from 'react-responsive-carousel';
import React from 'react';
import Link from 'next/link';

type ScheduleForDayProps = {
  day: string;
  days: Day[];
  schedule: ScheduleSlot[][];
};

const ScheduleForDay = (props: ScheduleForDayProps): JSX.Element => {
  return (
    <>
      <ul className="absolute p-5 top-0 left-0 z-50 text-black-lightest">
        {props.days.map((day, index) => (
          <li key={index}>
            <Link href={'/schedule/' + day.sortOrder}>
              <a> {day.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="conference-hall">
        <div className="schedule">
          <Carousel
            autoPlay={false}
            axis={'vertical'}
            infiniteLoop={false}
            interval={8000}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            useKeyboardArrows={true}
            verticalSwipe={'natural'}
          >
            {props.schedule &&
              props.schedule.map((value, index) => (
                <div key={index}>
                  {value.map((session, i) => (
                    <ScheduleRow sessions={session.Sessions} timeslot={session.Timeslot} key={i} />
                  ))}
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ScheduleForDay;
