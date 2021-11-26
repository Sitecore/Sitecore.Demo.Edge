import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import { DayTimeContextProvider } from '../contexts/DayTimeContext';

const App = ({ Component, pageProps }: AppProps) => (
  <div className="screen">
    <Head>
      <title>PLAY! Summit TV</title>
      <meta name="description" content="PLAY! Summit TV displays" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <DayTimeContextProvider>
        <Navigation />
        <Component {...pageProps} />
      </DayTimeContextProvider>
    </main>
  </div>
);

export default App;
