import { getSessions } from '../../api/queries/getSessions';
import { getSpeakers, getSpeakerById } from '../../api/queries/getSpeakers';
import { Session, Speaker } from '../../interfaces';
import SpeakerDisplay from '../../components/SpeakerDisplay';

type SpeakerProps = {
  sessions: Session[];
  speaker: Speaker;
  preview: boolean;
};

export declare type Params = {
  [param: string]: any;
};

export default function Room(props: SpeakerProps) {
  return <SpeakerDisplay sessions={props.sessions} speaker={props.speaker} />;
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { speakers } = await getSpeakers(false);

  // Get the paths we want to pre-render based on posts
  const paths = speakers.map((speaker) => ({
    params: { id: speaker.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export const getStaticProps = async ({ params }: Params) => {
  console.log(params.id);

  const { speaker } = await getSpeakerById(params.id);
  const { sessions } = await getSessions(false, '8zA5upmX40i227rWgxskxA');

  return {
    props: {
      sessions: sessions,
      speaker: speaker,
    },
    revalidate: 10,
  };
};
