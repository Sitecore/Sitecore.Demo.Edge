import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="screen">
      <Head>
        <title>PLAY! Summit Billboard</title>
        <meta name="description" content="PLAY! Summit Billboard displays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
export default App;
