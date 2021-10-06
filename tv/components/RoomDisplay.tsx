import { Session } from '../interfaces/session';
import { Room } from '../interfaces/room';
import Image from 'next/image';
import qr from '../public/play_qr.png';
import logo from '../public/p_logo_transparent.png';

type RoomProps = {
  sessions: Session[];
  room: Room;
};

const RoomDisplay = (props: RoomProps): JSX.Element => {
  console.log(props.sessions);

  return (
    <div id="container">
      <div id="monitor">
        <div id="monitorscreen">
          <div className="roomDisplay">
            <div className="image-left">
              <div className="checkin-qrcode">
                <div className="checkin-text">CHECK IN</div>
                <Image className="checkin-code" src={qr} alt="check-in" width={160} height={160} />
              </div>
            </div>
            <div className="scheduled">
              <div className="black-container "></div>
              <div className="orange-container"></div>
              <div className="blue-container"></div>
              <div className="wrapper">
                <div className="w-full">
                  <Image className="logo" src={logo} alt="logo" width={60} height={80} />
                  <div className="room-name text-right text-white text-7xl font-extrabold inline right-0 absolute pt-10">
                    {props.room.name}
                  </div>
                </div>
                <h1 className="eyebrow">Happening now</h1>
                <h1 className="title">{props.sessions[0]?.name}</h1>
                <div className="detail">
                  {props.sessions[0]?.speaker}
                  <br />
                  10:00 AM - 11:00 AM
                </div>
                <div className="next-session">
                  <div className="background"></div>
                  <div className="left-content">
                    <div className="eyebrow">Coming up next...</div>
                    <div className="title">Creating the ultimate outdoor experience</div>
                    <div className="detail">Richard Johnson | 11 - 12</div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
