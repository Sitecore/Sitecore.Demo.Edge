import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBullhorn,
  faEllipsisH,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const RightSidebar = () => {
  return (
    <div className="w-9/12 h-auto py-3 pr-2">
      <div className="w-full text-gray-600 border-b-2 pb-2 mb-2 border-gray-300">
        <p className="font-semibold mb-2">Your Pages</p>
        <li className="h-12 mb-2 flex items-center -ml-3 justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div>
            <img
              className="w-8 h-8 rounded-full"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/tInzwsw2pVX.png"
              alt="user"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Littlebit Programmer</p>
          </div>
        </li>
        <ul className="text-gray-500 text-sm">
          <li className="h-8 mb-2 flex items-center justify-content cursor-pointer space-x-3 p-2 rounded-md hover:bg-gray-200">
            <div>
              <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
            </div>
            <div>
              <p className="text-xs">Notification</p>
            </div>
          </li>
          <li className="h-8 flex items-center justify-content cursor-pointer space-x-3 p-2 rounded-md hover:bg-gray-200">
            <div>
              <FontAwesomeIcon icon={faBullhorn}></FontAwesomeIcon>
            </div>
            <div>
              <p className="text-xs">Create promotion</p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-600">
          <div>
            <p className="text-sm font-semibold">Contacts</p>
          </div>
          <div className="flex items-center space-x-3 text-gray-500">
            <button className="w-8 h-8 focus:outline-none rounded-full hover:bg-gray-200">
              <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
            </button>
            <button className="w-8 h-8 focus:outline-none rounded-full hover:bg-gray-200">
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
            <button className="w-8 h-8 focus:outline-none rounded-full hover:bg-gray-200">
              <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
            </button>
          </div>
        </div>
        <div className="-ml-2">
          <ul className="w-full text-gray-600">
            <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://picsum.photos/200"
                  alt="user"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Play! Summit</p>
              </div>
            </li>
            <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://picsum.photos/200"
                  alt="user"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Travarsy Media</p>
              </div>
            </li>
            <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://picsum.photos/200"
                  alt="user"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Ben Awad</p>
              </div>
            </li>
            <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://picsum.photos/200"
                  alt="user"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Fireship io</p>
              </div>
            </li>
            <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://picsum.photos/200"
                  alt="user"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Demo Team</p>
              </div>
            </li>
            <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://picsum.photos/200"
                  alt="user"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Groups</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
