import React from "react";
import { Post } from "../../interfaces/index";
import Story from "./Story";

type PostProps = {
  posts: Post[];
};

export default function PostContainer(props: PostProps) {
  return (
    <div className="content">
      <div className="linkedin">
        {props.posts &&
          props.posts.map((post, index) => {
            return (
              <div key={index} className="linkedin">
                <Story post={post} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
