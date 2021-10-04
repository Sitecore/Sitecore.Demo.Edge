import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  return (
    <main className="main">
      <div className="icons">
        <Link href="/facebook" passHref>
          <a>
            <FontAwesomeIcon
              icon={faFacebookSquare}
              className="text-6xl"
            ></FontAwesomeIcon>
            <p>Facebook</p>
          </a>
        </Link>
        <Link href="/twitter" passHref>
          <a>
            <FontAwesomeIcon
              icon={faTwitterSquare}
              className="text-6xl"
            ></FontAwesomeIcon>
            <p>Twitter</p>
          </a>
        </Link>
        <Link href="/instagram" passHref>
          <a>
            <FontAwesomeIcon
              icon={faInstagramSquare}
              className="text-6xl"
            ></FontAwesomeIcon>
            <p>Instagram</p>
          </a>
        </Link>
        <Link href="/linkedin" passHref>
          <a>
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-6xl"
            ></FontAwesomeIcon>
            <p>Linkedin</p>
          </a>
        </Link>
      </div>
    </main>
  );
}
