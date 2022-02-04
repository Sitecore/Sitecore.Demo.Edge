import Image from 'next/image';
import { Session } from '../interfaces/session';
import qr from '../public/play_qr.png';
import bg from '../public/room-bg.jpg';
import logo from '../public/p_logo_transparent.png';
import { contentHubImageLoader } from '../utilities/contentHubImageLoader';

type RoomProps = {
  room: string;
  currentSession: Session | null;
  nextSession: Session | null;
};

const RoomDisplay = ({ room, currentSession, nextSession }: RoomProps): JSX.Element => {
  const handleCurrentSessionQrCodeClick = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}?chid=${currentSession?.id}`
    );
  };

  const handleNextSessionQrCodeClick = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_WEBSITE_URL}?chid=${nextSession?.id}`);
  };

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

            <div className="checkin-container">
              <div className="checkin-text">CHECK IN</div>
              <Image
                className="qr-code"
                src={qr}
                alt="check-in"
                width={160}
                height={160}
                title="Click to copy QR code link"
                onClick={() => handleCurrentSessionQrCodeClick()}
              />
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
              {room}
            </div>
          </div>

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

          {!currentSession && nextSession && (
            <div className="no-session">
              <h1 className="eyebrow">No session at the moment</h1>
              <h1 className="title">Check out the next session</h1>
            </div>
          )}

          {nextSession && (
            <div className="next-session">
              <div className="background"></div>
              <div className="left-content">
                <div className="eyebrow">Coming up next...</div>
                <div className="title">{nextSession.name}</div>
                <div className="detail">
                  {nextSession.speaker} {nextSession.speaker && <span> | </span>}
                  {nextSession.timeslot}
                </div>
              </div>
              <div className="right-content">
                <Image
                  className="qr-code"
                  src={qr}
                  alt="next-session-qr-code"
                  width={160}
                  height={160}
                  title="Click to copy QR code link"
                  onClick={() => handleNextSessionQrCodeClick()}
                />
              </div>
            </div>
          )}

          {!currentSession && !nextSession && (
            <div className="no-session">
              <h1 className="eyebrow">Done for the day!</h1>
              <h1 className="title">Thank you for attending PLAY! Summit</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
