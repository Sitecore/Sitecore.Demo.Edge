import { getBlogs } from '../api/queries/getBlogs';
import { GetStaticProps } from 'next';
import { Blog } from '../interfaces';
import RoomDisplay from '../components/RoomDisplay';

type RoomProps = {
  blogs: Blog[];
  preview: boolean;
};

export default function Room(props: RoomProps) {
  return <RoomDisplay blogs={props.blogs} />;
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { blogs } = await getBlogs(preview);

  return {
    props: {
      blogs: blogs,
    },
    revalidate: 10,
  };
};
