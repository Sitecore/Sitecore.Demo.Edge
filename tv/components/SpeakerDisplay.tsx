import { Session } from '../interfaces/session';
import { Speaker } from '../interfaces/speaker';
import Image from 'next/image';
import SessionList from './SessionList';
import { contentHubImageLoader } from '../utilities/contentHubImageLoader';

type SpeakerDisplayProps = {
  sessions: Session[];
  speaker: Speaker;
};

const SpeakerDisplay = (props: SpeakerDisplayProps): JSX.Element => {
  return (
    <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 mx-auto text-gray-800 relative md:text-left">
      <div className="md:flex items-center -mx-10">
        <div className="w-full md:w-5/12 px-10 mb-10 md:mb-0">
          <div className="relative">
            <Image
              loader={contentHubImageLoader}
              src={props.speaker.photo}
              width="400px"
              height="400px"
              alt="Sample"
            />
            <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-10">
          <div className="mb-10">
            <h1 className="font-bold uppercase text-2xl mb-5">{props.speaker.name}</h1>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: props.speaker.description }}
            ></p>
          </div>
          <div>
            <SessionList sessions={props.sessions}></SessionList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerDisplay;
