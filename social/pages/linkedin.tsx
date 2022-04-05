import React from "react";
import Navbar from "../components/linkedin/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import { getTwitterPosts } from "./api/queries/getTwitterPosts";
import PostContainer from "../components/linkedin/PostContainer";

type PostProps = {
  posts: Post[];
  preview: boolean;
};

export default function LInkedin(props: PostProps) {
  return (
    <div className="linkedin">
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
