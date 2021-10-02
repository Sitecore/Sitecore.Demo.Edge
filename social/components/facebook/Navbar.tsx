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
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="navbar w-full h-16 bg-white flex flex-row gap-2 shadow-md p-3">
      <div className="flex gap-1">
        <div className="text-blue-500 justify-start inline-flex">
          <Link href="/facebook" passHref>
            <FontAwesomeIcon
              icon={faFacebook}
              className="w-10 h-10"
            ></FontAwesomeIcon>
          </Link>
        </div>
        <div className="bg-gray-200 rounded-full h-10 w-10 inline-flex">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-gray-600 w-4 h-4 m-3 justify-start"
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className="flex text-right ml-auto gap-1">
        <div className="bg-gray-200 rounded-full h-10 w-10 justify-end inline-flex">
          <FontAwesomeIcon
            icon={faPlus}
            className="text-gray-600 w-4 h-4 m-3 text-sm"
          ></FontAwesomeIcon>
        </div>
        <div className="bg-gray-200 rounded-full h-10 w-10 justify-end inline-flex">
          <FontAwesomeIcon
            icon={faFacebookMessenger}
            className="text-gray-600 w-4 h-4 m-3 text-sm"
          ></FontAwesomeIcon>
        </div>
        <div className="bg-gray-200 rounded-full h-10 w-10 justify-end inline-flex">
          <FontAwesomeIcon
            icon={faBell}
            className="text-gray-600 w-4 h-4 m-3 text-sm"
          ></FontAwesomeIcon>
        </div>
        <div className="bg-gray-200 rounded-full h-10 w-10 justify-end inline-flex">
          <FontAwesomeIcon
            icon={faSortDown}
            className="text-gray-600 w-4 h-4 m-3 mt-2 text-sm"
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
