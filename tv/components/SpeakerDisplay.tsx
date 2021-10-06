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
    <div className="speakerDisplay">
      <div className="left">
        <div className="relative">
          <Image
            loader={contentHubImageLoader}
            src={props.speaker.photo}
            width="400px"
            height="400px"
            alt="Sample"
          />
        </div>
      </div>

      <div className="right">
        <div className="w-full p-10">
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
