import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faTv,
  faStore,
  faUser,
  faGamepad,
  faPlus,
  faBell,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="w-full h-14 bg-white grid grid-cols-7 gap-4 shadow-md">
      <div className="col-span-2 flex items-center">
        <div className="flex items-center ml-2">
          <div className="h-10 text-blue-500">
            <Link href="/" passHref>
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ fontSize: 40 }}
              ></FontAwesomeIcon>
            </Link>
          </div>
          <div className="h-10">
            <input
              placeholder="Search Facebook"
              className="bg-gray-100 rounded-full h-full focus:outline-none ml-2 px-3 pr-4"
            />
          </div>
        </div>
      </div>
      <div className="col-span-3  hidden md:flex items-center justify-center space-x-2">
        <Link href="/" passHref>
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div className="text-blue-500">
                <FontAwesomeIcon
                  icon={faHome}
                  className="text-2xl"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/" passHref>
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div className="absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                9+
              </div>
              <div className="text-blue-500">
                <FontAwesomeIcon
                  icon={faTv}
                  className="text-2xl"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/" passHref>
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div className="hidden absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                9+
              </div>
              <div className="text-blue-500">
                <FontAwesomeIcon
                  icon={faStore}
                  className="text-2xl"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/" passHref>
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div className="absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                2
              </div>
              <div className="text-blue-500">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-2xl"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/" passHref>
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div className="absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                9+
              </div>
              <div className="text-blue-500">
                <FontAwesomeIcon
                  icon={faGamepad}
                  className="text-2xl"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-span-2 flex items-center justify-end">
        <div className="h-10 w-auto flex items-center space-x-2 pr-2">
          <Link href="/" passHref>
            <button className="h-10 px-2 hidden md:flex space-x-1 items-center justify-center focus:outline-none hover:bg-gray-300 rounded-full">
              <div className="h-8">
                <img
                  src="https://picsum.photos/200"
                  className="w-8 h-8 rounded-full"
                  alt="dp"
                />
              </div>
              <div className="h-8 flex items-center justify-content">
                <p className="font-semibold text-sm">Play!</p>
              </div>
            </button>
          </Link>
          <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </button>
          <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
            <FontAwesomeIcon icon={faFacebookMessenger}></FontAwesomeIcon>
          </button>
          <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
          </button>
          <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
            <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
