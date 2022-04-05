import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faComment,
  faHome,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import profileLogo from "../../public/PLAY_Summit_black.png";

const Navbar = () => {
  return (
    <div className="navbar w-full h-16 bg-white flex flex-row gap-2 shadow-md p-3">
      <div className="flex gap-1">
        <div className="text-blue-500 justify-start inline-flex">
          <Link href="/facebook" passHref>
            <FontAwesomeIcon
              icon={faLinkedin}
              className="w-10 h-10"
            ></FontAwesomeIcon>
          </Link>
        </div>
        <div className="h-10 w-10 inline-flex">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-gray-600 w-6 h-6 m-2 justify-start"
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className="flex text-right ml-auto gap-1">
        <div className="h-10 w-10 justify-end inline-flex">
          <FontAwesomeIcon
            icon={faHome}
            className="text-gray-600 w-6 h-6 m-2 text-sm"
          ></FontAwesomeIcon>
        </div>
        <div className="h-10 w-10 justify-end inline-flex">
          <FontAwesomeIcon
            icon={faComment}
            className="text-gray-600 w-6 h-6 m-2 text-sm"
          ></FontAwesomeIcon>
        </div>
        <div className="h-10 w-10 justify-end inline-flex">
          <FontAwesomeIcon
            icon={faBell}
            className="text-gray-600 w-6 h-6 m-2 text-sm"
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
