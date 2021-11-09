import { useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import {
  DayTimeContext,
  DayTimeContextValue,
  dayTimeDefaultValue,
} from '../contexts/DayTimeContext';

function App({ Component, pageProps }: AppProps) {
  const [dayTimeState, setDayTimeState] = useState(dayTimeDefaultValue);

  // TODO: Will probably re-render due to using a custom re-created object.
  const dayTimeContextValue: DayTimeContextValue = {
    dayTime: dayTimeState,
    setDayTime: (day: string, time: string) => {
      setDayTimeState({
        day,
        time,
      });
    },
  };

  return (
    <div className="screen">
      <Head>
        <title>PLAY! Summit TV</title>
        <meta name="description" content="PLAY! Summit TV displays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DayTimeContext.Provider value={dayTimeContextValue}>
          <Navigation />
          <Component {...pageProps} />
        </DayTimeContext.Provider>
      </main>
    </div>
  );
}
export default App;
