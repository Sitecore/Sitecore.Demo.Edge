import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="screen">
      <Head>
        <title>PLAY! Summit TV</title>
        <meta name="description" content="PLAY! Summit TV displays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
export default App;
