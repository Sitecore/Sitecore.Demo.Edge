import { Post } from "../../interfaces/index";
import React from "react";
import Image from "next/image";
import profileLogo from "../../public/PLAY_Summit_black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faComment,
  faEllipsisH,
  faEllipsisV,
  faGlobe,
  faGlobeAmericas,
  faHeart,
  faPaperPlane,
  faRetweet,
  faShare,
  faShareAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

type StoryProps = {
  post: Post;
};

const Story = (props: StoryProps) => {
  return (
    <div className="">
      <div className="flex items-center">
        <Image
          className="rounded-full h-6 w-6"
          src={profileLogo}
          alt="logo"
          width={50}
          height={50}
        />
        <div className="w-full">
          <div className="flex flex-row gap-2 align-top h-6 ml-4 relative w-full">
            <span className="flex items-start font-bold text-gray-900 leading-5">
              Play! Summit <span className="font-normal"> &nbsp; • 1st</span>
            </span>
            <FontAwesomeIcon
              icon={faEllipsisH}
              className="w-4 h-4 inline-flex text-gray-500 justify-end items-end absolute right-4"
            ></FontAwesomeIcon>
          </div>
          <div className="ml-4">
            <span className="text-gray-500 inline">
              2d
              <span className="font-normal">
                &nbsp; •
                <FontAwesomeIcon
                  icon={faGlobeAmericas}
                  className="w-4 h-4 inline-flex text-gray-500 ml-2"
                ></FontAwesomeIcon>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="mb-2 leading-normal whitespace-pre-wrap text-gray-700 text-sm py-2">
        Learn to sell. Learn to build. If you can do both, you will be
        unstoppable.
      </div>
      <span>
        <FontAwesomeIcon
          icon={faThumbsUp}
          className="w-4 h-4 inline-flex text-gray-500 mr-1"
        ></FontAwesomeIcon>
        35
      </span>
      <hr className="mt-4 border-gray-300"/>
      <div className="flex text-gray-700 mt-2 justify-between">
        <div>
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="w-4 h-4 inline-flex text-gray-600 mr-1"
          ></FontAwesomeIcon>
          <span>Like</span>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faComment}
            className="w-4 h-4 inline-flex text-gray-600 mr-1"
          ></FontAwesomeIcon>
          <span>Comment</span>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faShare}
            className="w-4 h-4 inline-flex text-gray-600 mr-1"
          ></FontAwesomeIcon>
          <span>Share</span>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="w-4 h-4 inline-flex text-gray-600 mr-1"
          ></FontAwesomeIcon>
          <span>Send</span>
        </div>
      </div>
    </div>
  );
};

export default Story;
