import ScheduleRow from './ScheduleRow';
import { Day } from '../interfaces/day';
import { ScheduleSlot } from '../interfaces/schedule';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import hallImage from '../public/conference-hall.jpg';

type ScheduleForDayProps = {
  day: string;
  days: Day[];
  schedule: ScheduleSlot[][];
};

const ScheduleForDay = (props: ScheduleForDayProps): JSX.Element => {
  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      if (e.key == 'z') {
        const container = document.querySelector('.conference-hall');
        container?.classList.toggle('zoomed');
      }
    });
  }, []);

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
        <Image className="image" src={hallImage} alt="Conference lobby" layout="responsive" />
        <div id="container">
          <div id="monitor">
            <div id="monitorscreen">
              <div className="schedule">
                {props.schedule && props.schedule.length > 0 && (
                  <div className="slide-container active">
                    {props.schedule[0].map((session, i) => (
                      <div className="slide" key={i}>
                        <ScheduleRow sessions={session.Sessions} timeslot={session.Timeslot} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleForDay;
