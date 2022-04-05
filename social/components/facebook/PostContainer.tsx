import React from "react";
import { Post } from "../../interfaces/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEllipsisH,
  faGlobe,
  faGlobeAmericas,
  faHeart,
  faShare,
  faSurprise,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import profileLogo from "../../public/PLAY_Summit_black.png";

type PostProps = {
  posts: Post[];
  preview: boolean;
};

export default function PostContainer(props: PostProps) {
  return (
    <div className="mt-4 w-full h-full">
      {props.posts &&
        props.posts.map((post, index) => {
          return (
            <div
              key={index}
              className="w-full shadow h-auto bg-white my-2 rounded-md post flex-col"
            >
              <div className="flex flex-row h-20 p-4 w-full">
                <div className="flex gap-2">
                  <div className="justify-start inline-flex w-12">
                    <Image
                      className="rounded-full"
                      src={profileLogo}
                      alt="logo"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="justify-start">
                    <span className="text-gray-500 font-semibold">
                      Play! Summit
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">2d</span>
                    <FontAwesomeIcon
                      icon={faGlobeAmericas}
                      className="w-6 h-6 inline-flex text-gray-700 pl-2"
                    ></FontAwesomeIcon>
                  </div>
                </div>
                <div className="flex text-right ml-auto gap-1">
                  <FontAwesomeIcon
                    className="justify-end inline-flex text-gray-500 w-6"
                    icon={faEllipsisH}
                  ></FontAwesomeIcon>
                </div>
              </div>
              <div className="text-gray-500 px-3 text-sm">
                {post.socialMediaMessage_Body}
              </div>
              <div className="w-full h-76 max-h-80">
                <img
                  src="https://picsum.photos/1080/1920"
                  alt="postimage"
                  className="w-full h-76 max-h-80"
                />
              </div>
              <div className="w-full flex flex-col space-y-1 p-2">
                <div className="flex items-center justify-between px-3 pb-2 border-b text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="items-center justify-center w-6 h-6 p-1 rounded-full bg-red-500 text-white"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="items-center justify-center w-6 h-6 p-1 rounded-full bg-blue-500 text-white"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                      icon={faSurprise}
                      className="items-center justify-center w-6 h-6 p-1 rounded-full bg-yellow-500 text-white"
                    ></FontAwesomeIcon>
                    <div className="ml-1">
                      <p>130K</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">9 Shares</p>
                  </div>
                </div>
                <div className="flex space-x-3 text-gray-400 h-6">
                  <button className="flex-1 flex items-center  focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="w-4 h-4"
                    ></FontAwesomeIcon>
                    <p className="font-semibold text-sm">Like</p>
                  </button>
                  <button className="flex-1 flex items-center focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                    <FontAwesomeIcon
                      icon={faComment}
                      className="w-4 h-4"
                    ></FontAwesomeIcon>
                    <p className="font-semibold text-sm">Comment</p>
                  </button>
                  <button className="flex-1 flex items-center focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                    <FontAwesomeIcon
                      icon={faShare}
                      className="w-4 h-4"
                    ></FontAwesomeIcon>
                    <p className="font-semibold text-sm">Share</p>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
