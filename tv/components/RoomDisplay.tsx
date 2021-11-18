import { useContext } from 'react';
import Image from 'next/image';
import { Session } from '../interfaces/session';
import { Room } from '../interfaces/room';
import qr from '../public/play_qr.png';
import bg from '../public/room-bg.jpg';
import logo from '../public/p_logo_transparent.png';
import { contentHubImageLoader } from '../utilities/contentHubImageLoader';
import { DayTimeContext } from '../contexts/DayTimeContext';

type RoomProps = {
  sessions: Session[];
  room: Room;
};

const RoomDisplay = (props: RoomProps): JSX.Element => {
  const dayTimeContext = useContext(DayTimeContext);

  console.table('props.sessions');
  console.table(props.sessions);

  const selectedTime = parseInt(dayTimeContext.dayTime.time);
  console.table('selectedTime: ' + selectedTime);

  const currentAndNextSessions = props.sessions.filter(
    (session) => session.sortOrder >= selectedTime
  );
  let currentSession: Session | null = null;
  let nextSession: Session | null = null;

  if (currentAndNextSessions.length > 0) {
    const firstSession = currentAndNextSessions[0];

    if (firstSession.sortOrder === selectedTime) {
      currentSession = firstSession;

      if (currentAndNextSessions.length > 1) {
        nextSession = currentAndNextSessions[1];
      }
    } else {
      nextSession = firstSession;
    }
  }

  console.table('currentSession');
  console.table(currentSession);
  console.table('nextSession');
  console.table(nextSession);

  return (
    <div className="roomDisplay">
      <div className="image-left">
        {currentSession && (
          <>
            <Image
              loader={contentHubImageLoader}
              src={currentSession.image}
              layout="fill"
              objectFit="cover"
              alt="Sample"
            />

            <div className="checkin-qrcode">
              <div className="checkin-text">CHECK IN</div>
              <Image className="checkin-code" src={qr} alt="check-in" width={160} height={160} />
            </div>
          </>
        )}
        {!currentSession && <Image src={bg} layout="fill" objectFit="cover" alt="Sample" />}
      </div>
      <div className="scheduled">
        <div className="black-container"></div>
        <div className="orange-container"></div>
        <div className="blue-container"></div>
        <div className="wrapper">
          <div className="w-full">
            <Image className="logo" src={logo} alt="logo" width={60} height={80} />
            <div className="room-name text-right text-white text-6xl font-extrabold inline right-0 absolute pt-10">
              {props.room.name}
            </div>
          </div>

          {(currentSession || nextSession) && (
            <>
              {currentSession && (
                <>
                  <h1 className="eyebrow">Happening now</h1>
                  <h1 className="title">{currentSession.name}</h1>
                  <div className="detail">
                    {currentSession.speaker}
                    <br />
                    {currentSession.timeslot}
                  </div>
                </>
              )}
              {!currentSession && (
                <>
                  <h1 className="eyebrow">No session at the moment</h1>
                  <h1 className="title">Check out the next session</h1>
                </>
              )}
              {nextSession && (
                <div className="next-session">
                  <div className="background"></div>
                  <div className="left-content">
                    <div className="eyebrow">Coming up next...</div>
                    <div className="title">{nextSession.name}</div>
                    <div className="detail">
                      {nextSession.speaker} | {nextSession.timeslot}
                    </div>
                  </div>
                  <div className="right-content">
                    <Image
                      className="checkin-code"
                      src={qr}
                      alt="check-in"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {!currentSession && !nextSession && (
            <>
              <h1 className="eyebrow">Done for the day!</h1>
              <h1 className="title">Thank you for attending PLAY! Summit</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
