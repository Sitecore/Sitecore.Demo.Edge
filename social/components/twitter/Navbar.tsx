import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import profileLogo from "../../public/PLAY_Summit_black.png";

const Navbar = () => {
  return (
    <div className="navbar w-full h-16 bg-white flex justify-between gap-4 shadow-md pt-4 px-4">
      <div className="w-8 h-8">
        <Image
          className="rounded-full w-8 h-8"
          src={profileLogo}
          alt="logo"
          width={100}
          height={100}
        />
      </div>
      <Link href="/twitter" passHref>
        <FontAwesomeIcon
          icon={faTwitter}
          className="w-8 h-8 inline-flex text-blue-500"
        ></FontAwesomeIcon>
      </Link>
      <FontAwesomeIcon
        icon={faStar}
        className="w-4 h-8 inline-flex text-gray-400"
      ></FontAwesomeIcon>
    </div>
  );
};

export default Navbar;
