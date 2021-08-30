import { getSessions } from '../../api/queries/getSessions';
import { getSpeakers, getSpeakerById } from '../../api/queries/getSpeakers';
import { Speaker } from '../../interfaces/speaker';
import { Session } from '../../interfaces/session';
import SpeakerDisplay from '../../components/SpeakerDisplay';
import { Params } from '../../interfaces';

type SpeakersProps = {
  sessions: Session[];
  speaker: Speaker;
};

export declare type SpeakersParams = {
  [param: string]: Params;
};

export default function Speakers(props: SpeakersProps) {
  return <SpeakerDisplay sessions={props.sessions} speaker={props.speaker} />;
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get speakers
  const { speakers } = await getSpeakers();

  // Get the paths we want to pre-render based on speakers
  const paths = speakers.map((speaker) => ({
    params: { id: speaker.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export const getStaticProps = async ({ params }: SpeakersParams) => {
  const { speaker } = await getSpeakerById(params.id);
  const { sessions } = await getSessions('8zA5upmX40i227rWgxskxA');

  return {
    props: {
      sessions: sessions,
      speaker: speaker,
    },
    revalidate: 10,
  };
};
