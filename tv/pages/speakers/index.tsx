import { getSpeakers } from '../../api/queries/getSpeakers';
import { Speaker } from '../../interfaces/speaker';
import SpeakerList from '../../components/SpeakerList';

type SpeakersProps = {
  speakers: Speaker[];
};

const Speakers = (props: SpeakersProps): JSX.Element => {
  return <SpeakerList speakers={props.speakers} />;
};

// This also gets called at build time
export const getStaticProps = async () => {
  const { speakers } = await getSpeakers();

  return {
    props: {
      speakers: speakers,
    },
    revalidate: 10,
  };
};

export default Speakers;
