import axios from 'axios';
import { useEffect, useState } from 'react';
import { getDynamicWelcomeMessage, WelcomeMessage } from 'src/services/BoxeverService';

const DynamicWelcomeMessage = (): JSX.Element => {
  const [message, SetMessage] = useState('');

  useEffect(() => {
    async function getIpAddress() {
      const res = await axios.get('https://api.my-ip.io/ip');
      return res.data;
    }

    getIpAddress()
      .then((ipAddress) => getDynamicWelcomeMessage(ipAddress))
      .then((content: WelcomeMessage) => SetMessage(content.message));
  }, []);

  return <div>{message}</div>;
};

export default DynamicWelcomeMessage;
