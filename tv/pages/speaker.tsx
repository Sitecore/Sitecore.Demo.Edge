import Speaker from "../components/Speaker";
import { Session } from '../interfaces';
import { getSessions } from '../api/queries/getSessions';

type SpeakerProps = {
  sessions: Session[];
  preview: boolean;
};


export default function SpeakerPage(props: SpeakerProps) {
  return <Speaker sessions={props.sessions} />;
}

// This also gets called at build time
export const getStaticProps = async () => {
  const { sessions } = await getSessions(false, '8zA5upmX40i227rWgxskxA');

  return {
    props: {
      sessions: sessions,
    },
    revalidate: 10,
  };
};

