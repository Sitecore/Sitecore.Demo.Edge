import React from "react";
import CreatePostBox from "./CreatePostBox";
import PostContainer from "./PostContainer";
import { Post } from "../../interfaces/index";

type PostProps = {
  posts: Post[];
};

export default function NewsFeedScreen(props: PostProps) {
  return (
    <div className="w-full h-full">
      <CreatePostBox />
      <PostContainer posts={props.posts} />
    </div>
  );
}
