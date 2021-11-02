import ScheduleRow from './ScheduleRow';
import { Day, ScheduleSlot } from '../interfaces/session';
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
    let slideIndex = 0;
    function showSlides() {
      const slides = document.getElementsByClassName('slide-container');
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].classList.add('active');
      setTimeout(showSlides, 10000);
    }

    document.addEventListener('keypress', (e) => {
      if (e.key == 'z') {
        console.log(e.key);

        const container = document.querySelector('.conference-hall');
        container?.classList.toggle('zoomed');
      }
    });

    showSlides();
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
