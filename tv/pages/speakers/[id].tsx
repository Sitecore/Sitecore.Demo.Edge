import { getSessionsBySpeaker } from '../../api/queries/getSessions';
import { getSpeakers, getSpeakerById } from '../../api/queries/getSpeakers';
import { Speaker } from '../../interfaces/speaker';
import { Session } from '../../interfaces/session';
import SpeakerDisplay from '../../components/SpeakerDisplay';
import { Params } from '../../interfaces';

type SpeakerProps = {
  sessions: Session[];
  speaker: Speaker;
};

export declare type SpeakerParams = {
  [param: string]: Params;
};

export default function SpeakerPage(props: SpeakerProps) {
  return (
    <div id="container">
      <div id="monitor">
        <div id="monitorscreen">
          <SpeakerDisplay {...props} />{' '}
        </div>
      </div>
    </div>
  );
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
export const getStaticProps = async ({ params }: SpeakerParams) => {
  const { speaker } = await getSpeakerById(params.id);
  const { sessions } = await getSessionsBySpeaker(speaker.id);

  return {
    props: {
      sessions: sessions,
      speaker: speaker,
    },
    revalidate: 10,
  };
};
