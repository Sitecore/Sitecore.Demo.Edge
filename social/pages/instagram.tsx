import Head from "next/head";

import LeftSidebar from "../components/twitter/LeftSidebar";
import NewsFeedScreen from "../components/twitter/NewsFeedScreen";
import RightSidebar from "../components/twitter/RightSidebar";
import Navbar from "../components/twitter/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import { getInstagramPosts } from "./api/queries/getInstagramPosts";
import React from "react";
import InstagramHeader from "../components/instagram/InstagramHeader";
import InstagramFooter from "../components/instagram/InstagramFooter";
import InstagramPost from "../components/instagram/InstagramPost";
import NavButton from "../components/NavButton";

type PostProps = {
  posts: Post[];
  preview: boolean;
};

export default function Instagram(props: PostProps) {
  return (
    <>
      <div className="instagram">
        <InstagramHeader />
        <div className="content overflow-x-auto">
          <InstagramPost />
          <InstagramPost />
        </div>
        <InstagramFooter />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { posts } = await getInstagramPosts(preview);
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
};
