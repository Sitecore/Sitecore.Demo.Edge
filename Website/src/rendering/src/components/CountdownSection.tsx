import React, { useState, useEffect } from 'react';

const CountdownSection = (): JSX.Element => {
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    //const interval = null;
    const interval = setInterval(() => {
      setSeconds((seconds) => (seconds < 1 ? 60 : seconds - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <section className="section text-yellow flex text-center bg-black p-10">
      <div className="flex-1">
        <h2>298</h2>Day(s)
      </div>
      <div className="flex-1">
        <h2>01</h2>Hour(s)
      </div>
      <div className="flex-1">
        <h2>15</h2>Minute(s)
      </div>
      <div className="flex-1">
        <h2>{seconds}</h2>Second(s)
      </div>
    </section>
  );
};

export default CountdownSection;
