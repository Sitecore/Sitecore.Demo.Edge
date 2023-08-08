import React from 'react';
import Image from 'next/image';
import staticImage from '../public/tv-static.gif';

const Custom500 = (): JSX.Element => {
  return (
    <div className="conference-hall">
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

export default Custom500;
