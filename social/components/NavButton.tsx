import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NavButton = () => {
  return (
    <div>
      <Link href="/" passHref>
        <a className="nav-button">
          <FontAwesomeIcon
            icon={faHome}
            style={{ fontSize: 40 }}
          ></FontAwesomeIcon>
        </a>
      </Link>
    </div>
  );
};
export default NavButton;
