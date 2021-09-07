import React, { useState, useEffect } from 'react';

const CountdownSection = (): JSX.Element => {
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => (seconds < 1 ? 60 : seconds - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <section className="section countdown-section">
      <div className="countdown-component">
        <div className="countdown-number">298</div>
        <div className="number-label">Day(s)</div>
      </div>
      <div className="countdown-component">
        <div className="countdown-number">01</div>
        <div className="number-label">Hour(s)</div>
      </div>
      <div className="countdown-component">
        <div className="countdown-number">15</div>
        <div className="number-label">Minute(s)</div>
      </div>
      <div className="countdown-component">
        <div className="countdown-number">{seconds}</div>
        <div className="number-label">Second(s)</div>
      </div>
    </section>
  );
};

export default CountdownSection;
