import React from "react";
import Navbar from "../components/linkedin/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import PostContainer from "../components/linkedin/PostContainer";
import { getPostsBySite } from "./api/queries/getPosts";

type PostProps = {
  posts: Post[];
};

export default function LInkedin(props: PostProps) {
  return (
    <div className="linkedin">
      <Navbar />
      <PostContainer posts={props.posts} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { posts } = await getPostsBySite("Linkedin");
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
};
