import React from 'react';
import Image from 'next/image';
import hallImage from '../public/conference-hall.jpg';
import hallwayImage from '../public/conference-hallway.jpg';
import staticImage from '../public/tv-static.gif';
import router from 'next/router';

const ErrorTv = (): JSX.Element => {
  const backgroundChooser =
    process.browser &&
    (router.asPath.indexOf('rooms') > 0 || router.asPath.indexOf('venues') > 0) ? (
      <Image
        className="room-background"
        src={hallwayImage}
        alt="Conference lobby"
        layout="responsive"
      />
    ) : (
      <Image className="image" src={hallImage} alt="Conference lobby" layout="responsive" />
    );

  return (
    <div className="conference-hall">
      {backgroundChooser}
      <div id="container">
        <div id="monitor">
          <div id="monitorscreen">
            <Image className="image" src={staticImage} alt="Conference lobby" layout="responsive" />
            <div className="error">
              <span className="error-icon">☹</span>
              Let&apos;s just say somehow, somewhere, something went very very wrong... <br />
              Somebody is looking into it.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorTv;
