import React from "react";
import Navbar from "../components/twitter/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import { getTwitterPosts } from "./api/queries/getTwitterPosts";
import PostContainer from "../components/twitter/PostContainer";

type PostProps = {
  posts: Post[];
  preview: boolean;
};

export default function Twitter(props: PostProps) {
  return (
    <div className="twitter">
      <Navbar />
      <PostContainer posts={props.posts} preview={props.preview} />
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
