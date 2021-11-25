import React from 'react';
import Link from 'next/link';
import { Session } from '../interfaces/session';
// import { contentHubImageSrcGeneratorFromString } from '../utilities/contentHubImageLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faClock,
  faDoorOpen,
  faTag,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

type ScheduleDetailsProps = {
  sessions: Session[];
};

const ScheduleDetails = (props: ScheduleDetailsProps): JSX.Element => {
  console.log(props);
  return (
    <>
      {/* {props.sessions.map((session, index) => { */}
      <div
        // key={index}
        // id={session.id}
        className={
          'absolute left-0 right-0 top-0 bottom-0 w-full h-full z-40 bg-red session-detail'
        }
      >
        <div className="session-close-detail from-center">
          <span>
            <FontAwesomeIcon className="icon" icon={faTimes} />
          </span>
        </div>
        <div
          className={'session-detail-image w-full h-2/5 bg-cover bg-no-repeat bg-center relative'}
          // style={{
          //   backgroundImage: `url("${contentHubImageSrcGeneratorFromString(session.image)}")`,
          // }}
          style={{
            backgroundImage: `url("/backgrounds/kiosk-hall.jpg")`,
          }}
        >
          <div className="flex flex-col align-bottom justify-between p-2 m-2 bottom-0 right-0 absolute bg-yellow text-black font-bold shadow-lg">
            <div>
              <span>
                <FontAwesomeIcon className="icon" icon={faTag} />
              </span>
              VIP tickets only
            </div>
          </div>
        </div>
        <div className="bg-black w-full h-3/5 p-6 text-white space-y-4">
          <h2 className="text-4xl font-bold">MEET A PRO: Q&A WITH ZORAN BOROVIC</h2>
          <div className="flex flex-row align-middle w-full justify-between text-xl">
            <div>
              <span>
                <FontAwesomeIcon className="icon" icon={faCalendar} />
              </span>
              Day 1
            </div>
            <div>
              <span>
                <FontAwesomeIcon className="icon" icon={faClock} />
              </span>
              10:00 am - 12:00 pm
            </div>
            <div>
              <span>
                <FontAwesomeIcon className="icon" icon={faDoorOpen} />
              </span>
              Meeting room hallway
            </div>
            <div>
              <span>
                <FontAwesomeIcon className="icon" icon={faUser} />
              </span>
              Speaker 1, Speaker 2
            </div>
          </div>
          <div className="btn__area--minimal w-full">
            <Link href="/tickets">
              <a className="btn--main btn--main--round btn--main--round--primary btn--main--big btn-right block text-center">
                Book tickets
              </a>
            </Link>
          </div>
          <div className="overflow-auto">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat lacinia
              ullamcorper. In nulla dolor, pulvinar eget lobortis non, lacinia id metus. Fusce quis
              odio imperdiet, vehicula velit id, molestie turpis. Integer risus justo, semper in
              justo at, varius luctus diam. Ut eu metus vitae mauris posuere fringilla. Proin
              imperdiet, leo vel posuere vehicula, felis magna facilisis mauris, quis fringilla
              magna tellus sed dolor. Phasellus vulputate elementum dolor quis dictum. Sed vulputate
              vel leo sit amet auctor. Nulla luctus purus dapibus orci consequat, dictum commodo sem
              cursus.
            </p>
            <p>
              Suspendisse euismod sodales nisl nec condimentum. Maecenas quis hendrerit libero. In
              vehicula rutrum arcu, non tempor nisl malesuada quis. Curabitur sed arcu enim. Aliquam
              ultrices ante tempor leo gravida, sed pulvinar magna ultrices. Morbi pretium nec magna
              et feugiat. Maecenas condimentum ligula velit, id feugiat tortor varius vitae. Morbi
              quis viverra libero. Curabitur euismod luctus nisl, et vehicula justo aliquam sit
              amet. Aliquam ultricies, ex a convallis iaculis, diam risus pretium lacus, eu eleifend
              urna lorem ac arcu. Phasellus interdum tortor nec orci mattis, in condimentum felis
              luctus. In mollis sapien et sem maximus, in dignissim lectus consequat.
            </p>
            <p>
              asdfaskjd hfajekhw fkajhwgef ajkhwe khfagwekjh gakjhwg efkjaek jhagwjke akjwhe kjahwe
              kjawhekj hfawjekhf akjhwe fauyewfi auygwfeiuaywegfayu jdslKJ{' '}
            </p>
          </div>
        </div>
      </div>
      ;{/* })} */}
    </>
  );
};

export default ScheduleDetails;
