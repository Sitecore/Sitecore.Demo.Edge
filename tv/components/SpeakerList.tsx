import { Speaker } from '../interfaces/speaker';
import Link from 'next/link';
import Image from 'next/image';
import { contentHubImageLoader } from '../utilities/contentHubImageLoader';

type SpeakerListProps = {
  speakers: Speaker[];
};

const SpeakerList = (props: SpeakerListProps): JSX.Element => {
  return (
    <div className="speakerList">
      <ul>
        {props.speakers.map((speaker, index) => (
          <li key={index}>
            <Link href={'/speakers/' + speaker.id} passHref>
              <div className="speaker">
                <div className="photo">
                  <Image
                    loader={contentHubImageLoader}
                    src={speaker.photo}
                    width="80px"
                    height="80px"
                    alt="Sample"
                  />
                </div>
                {speaker.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpeakerList;
