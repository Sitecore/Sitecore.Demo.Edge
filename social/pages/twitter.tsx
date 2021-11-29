import React from "react";
import Navbar from "../components/twitter/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import PostContainer from "../components/twitter/PostContainer";
import { getPostsBySite } from "./api/queries/getPosts";

type PostProps = {
  posts: Post[];
};

export default function Twitter(props: PostProps) {
  return (
    <div className="twitter">
      <Navbar />
      <PostContainer posts={props.posts} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  //const { posts } = await getPostsBySite("Twitter");
  const { posts } = await getPostsBySite("");
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
};
