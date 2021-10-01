import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NavButton = () => {
  return (
    <Link href="/" passHref>
      <a className="nav-button">
        <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
      </a>
    </Link>
  );
};
export default NavButton;
