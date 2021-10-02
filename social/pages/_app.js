import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function MyApp({ Component, pageProps }) {
  //console.log(window.location);
  const showHomeButton =
    typeof window !== "undefined" && window.location.pathname == "/"
      ? "hidden"
      : "visible";

  return (
    <>
      <Head>
        <title>Demo Social Channel</title>
        <meta name="description" content="Sitecore Demo Social channel" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        />
      </Head>
      <main>
        <div className="container">
          <div className="center">
            <div className="iphone-case">
              <div className="iphone">
                <Component {...pageProps} />
              </div>
              <div className="volume-button"> </div>
              <div className="power-button"></div>
            </div>
          </div>
        </div>
        <div>
          <div className={showHomeButton}>
            <Link href="/" passHref>
              <a className="nav-button">
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default MyApp;
