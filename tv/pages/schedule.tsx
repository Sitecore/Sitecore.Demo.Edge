import { GetAllDays, getAllSessionsByDay } from '../api/queries/getSessions';
import ScheduleRow from '../components/ScheduleRow';
import { Day, ScheduleSlot } from '../interfaces/session';
import { groupBy, SplitArray } from '../utilities/arrayUtilities';
import { Carousel } from 'react-responsive-carousel';
import React from 'react';
import Link from 'next/link';

type ScheduleProps = {
  days: Day[];
  schedule: ScheduleSlot[][];
};

const customHandleClick = async (e: any, name: string) => {
  console.log(name);
};

const Schedule = (props: ScheduleProps): JSX.Element => {
  return (
    <>
      <ul className="absolute p-5 top-0 left-0 z-50 text-black-lightest">
        {props.days.map((day, index) => (
          <li key={index}>
            <Link href="#">
              <a onClick={(e) => customHandleClick(e, day.name)}> {day.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="conference-hall">
        <div className="schedule">
          <Carousel
            autoPlay={false}
            axis={'vertical'}
            infiniteLoop={true}
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

export const getStaticProps = async () => {
  const { sessions } = await getAllSessionsByDay('Day 1'); //Get hardcoded schedule for first day
  const { days } = await GetAllDays();

  return {
    props: {
      days: days,
      schedule: SplitArray(groupBy(sessions), 3),
    },
    revalidate: 10,
  };
};

export default Schedule;
