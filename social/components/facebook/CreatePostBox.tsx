import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faSmile, faVideo } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import profileLogo from "../../public/PLAY_Summit_black.png";

const CreatePostBox = () => {
  return (
    <div className="mt-4 rounded-lg bg-white flex flex-col p-3 px-4 shadow">
      <div className="flex items-center space-x-2 border-b pb-3 mb-2">
        <div className="w-10 h-10">
          <Image
            className="rounded-full"
            src={profileLogo}
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <button className="hover:bg-gray-200 focus:bg-gray-300 focus:outline-none flex-grow bg-gray-100 text-gray-500 text-left pl-2 rounded-full h-10">
          What&apos;s on your mind?
        </button>
      </div>
      <div className="flex space-x-3 text-sm">
        <button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
          <FontAwesomeIcon
            icon={faVideo}
            className="text-red-400 w-4"
          ></FontAwesomeIcon>
          <p className="font-semibold text-gray-500">Video</p>
        </button>
        <button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
          <FontAwesomeIcon
            icon={faImages}
            className="text-green-500 w-4"
          ></FontAwesomeIcon>
          <p className="font-semibold text-gray-500">Photos</p>
        </button>
        <button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
          <FontAwesomeIcon
            icon={faSmile}
            className="text-yellow-500 w-4"
          ></FontAwesomeIcon>
          <p className="font-semibold text-gray-500">Activity</p>
        </button>
      </div>
    </div>
  );
};

export default CreatePostBox;
