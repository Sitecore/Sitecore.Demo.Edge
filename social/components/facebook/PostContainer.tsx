import React from "react";
import { Post } from "../../interfaces/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEllipsisH,
  faHeart,
  faShare,
  faSurprise,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import profileLogo from "../../public/PLAY_Sumit_black.png";

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
              <div className="flex items-center space-x-2 p-3 px-4">
                <div className="w-10 h-10">
                  <Image
                    className="rounded-full"
                    src={profileLogo}
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="text-gray-500 font-semibold">
                    <p>Play! Summit</p>
                  </div>
                  <span className="text-xs text-gray-300">2d</span>
                </div>
                <div className="w-8 h-8">
                  <button className="w-full h-full hover:bg-gray-100 rounded-full text-gray-400 focus:outline-none">
                    <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
              <div className="text-gray-500 px-3">
                {post.socialMediaMessage_Body}
              </div>
              <div className="w-full h-76 max-h-80">
                <img
                  src="https://picsum.photos/1080/1920"
                  alt="postimage"
                  className="w-full h-76 max-h-80"
                />
              </div>
              <div className="w-full flex flex-col space-y-2 p-2 px-4">
                <div className="flex items-center justify-between px-3 pb-2 mb-2 border-b">
                  <div className="flex items-center">
                    <div className="flex items-center text-gray-400 text-sm">
                      <button className="focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white">
                        <FontAwesomeIcon
                          icon={faHeart}
                          style={{ fontSize: 10 }}
                        ></FontAwesomeIcon>
                      </button>
                      <button className="focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white">
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          style={{ fontSize: 10 }}
                        ></FontAwesomeIcon>
                      </button>
                      <button className="focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-yellow-500 text-white">
                        <FontAwesomeIcon
                          icon={faSurprise}
                          style={{ fontSize: 10 }}
                        ></FontAwesomeIcon>
                      </button>
                      <div className="ml-1">
                        <p>130K</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">9 Shares</p>
                  </div>
                </div>
                <div className="flex space-x-3 text-gray-400">
                  <button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                    <div>
                      <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Like</p>
                    </div>
                  </button>
                  <button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                    <div>
                      <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Comment</p>
                    </div>
                  </button>
                  <button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                    <div>
                      <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Share</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
