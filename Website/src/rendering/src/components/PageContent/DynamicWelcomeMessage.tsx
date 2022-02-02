import { useEffect, useState } from 'react';
import { getDynamicWelcomeMessage, WelcomeMessage } from 'src/services/BoxeverService';
import { getIpAddress } from 'src/services/IpAddressService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DynamicWelcomeMessage = (): JSX.Element => {
  const [message, SetMessage] = useState('');

  useEffect(() => {
    getIpAddress()
      .then((ipAddress) => getDynamicWelcomeMessage(ipAddress))
      .then((content: WelcomeMessage) => SetMessage(content.message));
  }, []);

  const CloseWelcomeMessage = () => {
    console.log('closing message');
  };

  const messageContent = message && (
    <section className="section bx_TopBanner">
      <FontAwesomeIcon
        fixedWidth
        className="sticky-button-right"
        icon={faTimes}
        onClick={CloseWelcomeMessage}
      />
      <div className="section__content container bx_TopBanner__banner">
        <span>{message}</span>
      </div>
    </section>
  );
  return <div>{messageContent}</div>;
};

export default DynamicWelcomeMessage;
