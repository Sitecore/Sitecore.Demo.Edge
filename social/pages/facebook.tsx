import NewsFeedScreen from "../components/facebook/NewsFeedScreen";
import Navbar from "../components/facebook/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import { getPostsBySite } from "./api/queries/getPosts";
import React from "react";

type PostProps = {
  posts: Post[];
};

export default function Facebook(props: PostProps) {
  console.log(props);
  return (
    <div className="facebook bg-gray-300">
      <Navbar />
      <div className="content overflow-x-auto">
        <div className="w-full h-full grid grid-cols-7">
          <div className="col-span-7 h-full">
            <NewsFeedScreen posts={props.posts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { posts } = await getPostsBySite("Facebook");
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
};
