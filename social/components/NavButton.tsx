import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NavButton = () => {
  return (
    <Link href="/" passHref>
      <a className="">
        <FontAwesomeIcon icon={faHome}
        className="w-12 h-12 bg-black text-white"></FontAwesomeIcon>
      </a>
    </Link>
  );
};
export default NavButton;
