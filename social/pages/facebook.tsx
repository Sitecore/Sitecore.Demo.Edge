import Head from "next/head";
import styles from "../styles/Home.module.css";

import LeftSidebar from "../components/facebook/LeftSidebar";
import NewsFeedScreen from "../components/facebook/NewsFeedScreen";
import RightSidebar from "../components/facebook/RightSidebar";
import Navbar from "../components/facebook/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import { getFacebookPosts } from "../pages/api/queries/getFacebookPosts";
import FooterButton from "../components/FooterButton";
import React from "react";
import NavButton from "../components/NavButton";

type PostProps = {
  posts: Post[];
  preview: boolean;
};

export default function Facebook(props: PostProps) {
  return (
    <div className="facebook bg-gray-300">
        <Navbar />
        <div className="content overflow-x-auto">
        <div className="w-full h-full grid grid-cols-7">
          <div className="col-span-7 h-full">
            <NewsFeedScreen posts={props.posts} preview={props.preview} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { posts } = await getFacebookPosts();
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
};
