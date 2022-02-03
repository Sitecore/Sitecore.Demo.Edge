import { useEffect, useState } from 'react';
import { getDynamicWelcomeMessage, WelcomeMessage } from 'src/services/BoxeverService';
import { getIpAddress } from 'src/services/IpAddressService';

const DynamicWelcomeMessage = (): JSX.Element => {
  const [message, SetMessage] = useState('');

  useEffect(() => {
    getIpAddress()
      .then((ipAddress) => getDynamicWelcomeMessage(ipAddress))
      .then((content: WelcomeMessage) => SetMessage(content.message));
  }, []);

  const messageContent = message && (
    <section className="section dynamic-welcome-message">
      <div className="section__content container message-banner">
        <span>{message}</span>
      </div>
    </section>
  );
  return <>{messageContent}</>;
};

export default DynamicWelcomeMessage;
