import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type InfoTextProps = {
  Icon: IconProp;
  children: React.ReactNode;
};

function InfoText(props: InfoTextProps): JSX.Element {
  return (
    <div className="info-text">
      <span>
        <FontAwesomeIcon className="icon" icon={props.Icon} />
      </span>
      {props.children}
    </div>
  );
}

export default InfoText;
