import Head from 'next/head';
import { getSessions } from '../../api/queries/getSessions';
import { getRooms } from '../../api/queries/getRooms';
import { Session } from '../../interfaces';
import RoomDisplay from '../../components/RoomDisplay';
import Footer from '../../components/Footer';

type RoomProps = {
  sessions: Session[];
  preview: boolean;
};

export default function Room(props: RoomProps) {
  return <RoomDisplay sessions={props.sessions} />;
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { rooms } = await getRooms(false);

  // Get the paths we want to pre-render based on posts
  const paths = rooms.map((room) => ({
    params: { id: room.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const { sessions } = await getSessions(false, params.id);

  console.log(sessions);

  return {
    props: {
      sessions: sessions,
    },
    revalidate: 10,
  };
}
