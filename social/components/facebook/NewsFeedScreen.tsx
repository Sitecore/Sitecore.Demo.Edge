import React from "react";
import CreatePostBox from "./CreatePostBox";
import PostContainer from "./PostContainer";
import Story from "./Story";
import { Post } from "../../interfaces/index";

type PostProps = {
  posts: Post[];
  preview: boolean;
};

export default function NewsFeedScreen(props: PostProps) {
  return (
    <div className="w-full h-full">
      <CreatePostBox />
      <PostContainer posts={props.posts} preview={props.preview} />
    </div>
  );
}
