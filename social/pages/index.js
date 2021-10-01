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
    <div className="container">
      <Head>
        <title>Demo Social Channel</title>
        <meta name="description" content="Sitecore Demo Social channel" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        />
      </Head>

      <div className="center">
        <div className="iphone-case">
          <div className="iphone">
            <main className="main">
              <div className="icons">
                <Link href="/facebook" passHref>
                  <a>
                    <FontAwesomeIcon
                      icon={faFacebookSquare}
                      className="text-7xl"
                    ></FontAwesomeIcon>
                    <p>Facebook</p>
                  </a>
                </Link>
                <Link href="/twitter" passHref>
                  <a>
                    <FontAwesomeIcon
                      icon={faTwitterSquare}
                      className="text-7xl"
                    ></FontAwesomeIcon>
                    <p>Twitter</p>
                  </a>
                </Link>
                <Link href="/instagram" passHref>
                  <a>
                    <FontAwesomeIcon
                      icon={faInstagramSquare}
                      className="text-7xl"
                    ></FontAwesomeIcon>
                    <p>Instagram</p>
                  </a>
                </Link>
                <Link href="/linkedin" passHref>
                  <a>
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="text-7xl"
                    ></FontAwesomeIcon>
                    <p>Linkedin</p>
                  </a>
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
