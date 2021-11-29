import { faCamera, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InstaLogo from "../../public/instagram.svg";
import Image from "next/image";

const InstagramHeader = () => {
  return (
    <div className="header">
      <FontAwesomeIcon className="w-1/12" icon={faCamera}></FontAwesomeIcon>
      <Image
        className="w-1/4"
        src={InstaLogo}
        alt="logo"
        width="100"
        height="30"
      ></Image>
      <FontAwesomeIcon className="w-1/12" icon={faPaperPlane}></FontAwesomeIcon>
    </div>
  );
};

export default InstagramHeader;
