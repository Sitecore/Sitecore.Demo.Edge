import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import React from "react";
import InstagramHeader from "../components/instagram/InstagramHeader";
import InstagramFooter from "../components/instagram/InstagramFooter";
import InstagramPost from "../components/instagram/InstagramPost";
import { getPostsBySite } from "./api/queries/getPosts";

type PostProps = {
  posts: Post[];
};

export default function Instagram(props: PostProps) {
  return (
    <>
      <div className="instagram">
        <InstagramHeader />
        <div className="content overflow-x-auto">
          <InstagramPost />
          <InstagramPost />
          <InstagramPost />
        </div>
        <InstagramFooter />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { posts } = await getPostsBySite("");
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
};
