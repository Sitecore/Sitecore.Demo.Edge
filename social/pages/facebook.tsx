import Head from "next/head";
//import styles from "../styles/Home.module.css";

import LeftSidebar from "../components/facebook/LeftSidebar";
import NewsFeedScreen from "../components/facebook/NewsFeedScreen";
import RightSidebar from "../components/facebook/RightSidebar";
import Navbar from "../components/facebook/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/Index";
import { getFacebookPosts } from "../pages/api/queries/getFacebookPosts";

type PostProps = {
  posts: Post[];
  preview: boolean;
};


export default function Facebook(props: PostProps) {
  return (
    <div>
      <Navbar />
      <div className="w-full h-full grid grid-cols-7">
        <div className="col-span-2 flex justify-start ml-2">
          <LeftSidebar />
        </div>
        <div className="col-span-3 h-full">
          <NewsFeedScreen posts={props.posts} preview={props.preview} />
        </div>
        <div className="col-span-2 flex justify-end pr-2">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { posts } = await getFacebookPosts(preview);
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
};
