import ScheduleRow from './ScheduleRow';
import { Day, ScheduleSlot } from '../interfaces/session';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import hallImage from '../public/conference-hall.jpg';

type ScheduleForDayProps = {
  day: string;
  days: Day[];
  schedule: ScheduleSlot[][];
};

const ScheduleForDay = (props: ScheduleForDayProps): JSX.Element => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    function handleCarousel() {
      console.log('timing out' + Date.now());
      const slidecontainers = document.querySelectorAll('.slide-container');

      console.log('activeSlide = ' + activeSlide);
      const newSlide = activeSlide + 1 >= slidecontainers.length ? 0 : activeSlide + 1;

      setActiveSlide(newSlide);
      for (let i = 0; i < slidecontainers.length; i++) {
        slidecontainers[i].classList.remove('active');
      }
      slidecontainers.item(activeSlide).classList.add('active');
    }

    setInterval(handleCarousel, 10000);
  }, [activeSlide]);

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
        <Image className="image" src={hallImage} alt="asda" layout="responsive" />
        <div id="container">
          <div id="monitor">
            <div id="monitorscreen">
              <div className="schedule">
                {props.schedule &&
                  props.schedule.map((value, index) => (
                    <div
                      id={'slide' + index}
                      className={index == 0 ? 'slide-container active' : 'slide-container'}
                      key={index}
                    >
                      {value.map((session, i) => {
                        return (
                          <div className="slide" key={i}>
                            <ScheduleRow sessions={session.Sessions} timeslot={session.Timeslot} />
                          </div>
                        );
                      })}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleForDay;
