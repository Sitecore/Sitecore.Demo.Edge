import { useEffect, useState } from 'react';
import { getDynamicWelcomeMessage, WelcomeMessage } from 'src/services/BoxeverService';
import { getIpAddress } from 'src/services/IpAddressService';
import { useRouter } from 'next/router';

const DynamicWelcomeMessage = (): JSX.Element => {
  const DEFAULT_MESSAGE = 'Welcome to PLAY! Summit.';

  const [message, SetMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const language: string = navigator.language
      ? navigator.language
      : router.locale
      ? router.locale
      : 'en';

    getIpAddress()
      .then((ipAddress) => getDynamicWelcomeMessage(ipAddress, language))
      .then((content: WelcomeMessage) =>
        SetMessage(content.message ? content.message : DEFAULT_MESSAGE)
      )
      .catch(() => SetMessage(DEFAULT_MESSAGE));
  }, [router.locale]);

  const messageContent = message && (
    <section className="section dynamic-welcome-message">
      <div className="section-content container message-banner">
        <span>{message}</span>
      </div>
    </section>
  );
  return <>{messageContent}</>;
};

export default DynamicWelcomeMessage;
