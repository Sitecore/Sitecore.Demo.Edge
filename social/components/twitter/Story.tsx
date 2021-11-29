import { Post } from "../../interfaces/index";
import React from "react";
import Image from "next/image";
import profileLogo from "../../public/PLAY_Summit_black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faComment,
  faEllipsisV,
  faHeart,
  faRetweet,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { contentHubImageSrcGenerator } from "../../utilities/contentHubImageLoader";

type StoryProps = {
  post: Post;
};

const Story = (props: StoryProps) => {
  return (
    <>
      <div className="flex items-center">
        <Image
          className="rounded-full h-6 w-6"
          src={profileLogo}
          alt="logo"
          width={50}
          height={50}
        />
        <div className="w-full">
          <div className="flex flex-row gap-2 align-top h-6 ml-4 w-full relative">
            <span className="flex items-start font-bold text-gray-900 leading-5">
              Play! Summit
            </span>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="w-4 h-4 inline-flex text-blue-500"
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="w-4 h-4 inline-flex text-gray-500 justify-end items-end absolute right-4"
            ></FontAwesomeIcon>
          </div>
          <div className="ml-4">
            <span className="text-gray-500 inline">@Play!Summit</span>
          </div>
        </div>
      </div>
      <div
        className="mb-2 leading-normal whitespace-pre-wrap text-gray-700 text-sm py-2"
        dangerouslySetInnerHTML={{
          __html: props.post.socialMediaMessage_Body,
        }}
      ></div>
      <div className="w-full h-76 max-h-80">
        {props.post.cmpContentToMasterLinkedAsset?.results[0] && (
          <Image
            src={contentHubImageSrcGenerator(
              props.post.cmpContentToMasterLinkedAsset
            )}
            alt="post"
            width="310"
            height="250"
          />
        )}
      </div>
      <span> 3:27 AM - May 31, 2018</span>
      <div className="flex text-gray-700 mt-2 justify-between">
        <div>
          <FontAwesomeIcon
            icon={faComment}
            className="w-4 h-4 inline-flex text-gray-600 mr-1"
          ></FontAwesomeIcon>
          <span>117</span>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faRetweet}
            className="w-4 h-4 inline-flex text-gray-600 mr-1"
          ></FontAwesomeIcon>
          <span>117</span>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faHeart}
            className="w-4 h-4 inline-flex text-gray-600 mr-1"
          ></FontAwesomeIcon>
          <span>117</span>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faShareAlt}
            className="w-4 h-4 inline-flex text-gray-600"
          ></FontAwesomeIcon>
        </div>
      </div>
    </>
  );
};

export default Story;
