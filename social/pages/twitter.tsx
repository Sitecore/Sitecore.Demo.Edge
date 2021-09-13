import Head from "next/head";
//import styles from "../styles/Home.module.css";

import LeftSidebar from "../components/twitter/LeftSidebar";
import NewsFeedScreen from "../components/twitter/NewsFeedScreen";
import RightSidebar from "../components/twitter/RightSidebar";
import Navbar from "../components/twitter/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import { getTwitterPosts } from "./api/queries/getTwitterPosts";

type PostProps = {
  posts: Post[];
  preview: boolean;
};

export default function Facebook(props: PostProps) {
  return (
    <div>
      <Navbar />
      <div className="w-full h-full grid grid-cols-7">
        <div className="col-span-2 justify-start ml-2 hidden md:flex">
          <LeftSidebar />
        </div>
        <div className="col-span-7 md:col-span-3 h-full">
          <NewsFeedScreen posts={props.posts} preview={props.preview} />
        </div>
        <div className="col-span-2  hidden md:flex justify-end pr-2">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { posts } = await getTwitterPosts(preview);
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
};
