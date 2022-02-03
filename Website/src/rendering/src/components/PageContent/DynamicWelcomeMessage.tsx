import { useEffect, useState } from 'react';
import { getDynamicWelcomeMessage, WelcomeMessage } from 'src/services/BoxeverService';
import { getIpAddress } from 'src/services/IpAddressService';
import { useRouter } from 'next/router';

const DynamicWelcomeMessage = (): JSX.Element => {
  const [message, SetMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const language: string | undefined = navigator.language ? navigator.language : router.locale;

    getIpAddress()
      .then((ipAddress) => getDynamicWelcomeMessage(ipAddress, language ? language : 'en'))
      .then((content: WelcomeMessage) => SetMessage(content.message));
  }, [router.locale]);

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
