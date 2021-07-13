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
    <section className="section text-yellow text-center bg-black py-12 hidden md:block">
      <div className="container justify-center text-xl flex">
        <div className="mx-8">
          <h2 className="text-blue-lightest">298</h2>
          <h3 className="uppercase text-white font-bold">Day(s)</h3>
        </div>
        <div className="mx-8">
          <h2 className="text-blue-lightest">01</h2>
          <h3 className="uppercase text-white font-bold">Hour(s)</h3>
        </div>
        <div className="mx-8">
          <h2 className="text-blue-lightest">15</h2>
          <h3 className="uppercase text-white font-bold">Minute(s)</h3>
        </div>
        <div className="mx-8">
          <h2 className="text-blue-lightest">{seconds}</h2>
          <h3 className="uppercase text-white font-bold">Second(s)</h3>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
