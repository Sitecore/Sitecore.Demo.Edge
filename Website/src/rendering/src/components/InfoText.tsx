import { PropsWithChildren } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type InfoTextProps = PropsWithChildren<{
  Icon: IconProp;
}>;

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
