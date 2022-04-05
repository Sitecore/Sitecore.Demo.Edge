import React from "react";
import { Post } from "../../interfaces/index";
import Story from "./Story";

type PostProps = {
  posts: Post[];
  preview: boolean;
};

export default function PostContainer(props: PostProps) {
  return (
    <div className="content">
      <div className="tweets">
        {props.posts &&
          props.posts.map((post, index) => {
            return (
              <div key={index} className="tweet">
                <Story post={post} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
