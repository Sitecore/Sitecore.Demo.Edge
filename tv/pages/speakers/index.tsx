import { getSpeakers } from '../../api/queries/getSpeakers';
import { Speaker } from '../../interfaces';
import SpeakerList from '../../components/SpeakerList';

type RoomProps = {
  speakers: Speaker[];
  preview: boolean;
};

const Speakers = (props: RoomProps): JSX.Element => {
  return <SpeakerList speakers={props.speakers} />;
};

// This also gets called at build time
export const getStaticProps = async () => {
  const { speakers } = await getSpeakers(false);

  return {
    props: {
      speakers: speakers,
    },
    revalidate: 10,
  };
};

export default Speakers;
