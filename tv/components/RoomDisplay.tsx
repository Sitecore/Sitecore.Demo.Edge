import { Session } from '../interfaces/session';
import { Room } from '../interfaces/room';
import Image from 'next/image';
import qr from '../public/play_qr.png';
import bg from '../public/room-bg.jpg';
import logo from '../public/p_logo_transparent.png';
import { contentHubImageLoader } from '../utilities/contentHubImageLoader';

type RoomProps = {
  sessions: Session[];
  room: Room;
};

const RoomDisplay = (props: RoomProps): JSX.Element => {
  return (
    <div className="roomDisplay">
      <div className="image-left">
        {props.sessions.length > 0 && (
          <>
            <Image
              loader={contentHubImageLoader}
              src={props.sessions[0]?.image}
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
        {props.sessions.length === 0 && (
          <Image src={bg} layout="fill" objectFit="cover" alt="Sample" />
        )}
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

          {props.sessions.length > 0 && (
            <>
              <h1 className="eyebrow">Happening now</h1>
              <h1 className="title">{props.sessions[0]?.name}</h1>
              <div className="detail">
                {props.sessions[0]?.speaker}
                <br />
                10:00 AM - 11:00 AM
              </div>
              {props.sessions.length > 1 && (
                <div className="next-session">
                  <div className="background"></div>
                  <div className="left-content">
                    <div className="eyebrow">Coming up next...</div>
                    <div className="title">{props.sessions[1]?.name}</div>
                    <div className="detail">{props.sessions[1]?.speaker} | 11:00 AM - 12:00 PM</div>
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

          {props.sessions.length === 0 && (
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
