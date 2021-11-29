import {
  faHeart,
  faHome,
  faPlusSquare,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InstagramFooter = () => {
  return (
    <div className="footer">
      <FontAwesomeIcon className="w-1/12" icon={faHome}></FontAwesomeIcon>
      <FontAwesomeIcon className="w-1/12" icon={faSearch}></FontAwesomeIcon>
      <FontAwesomeIcon className="w-1/12" icon={faPlusSquare}></FontAwesomeIcon>
      <FontAwesomeIcon className="w-1/12" icon={faHeart}></FontAwesomeIcon>
      <FontAwesomeIcon className="w-1/12" icon={faUser}></FontAwesomeIcon>

    </div>
  );
};

export default InstagramFooter;
