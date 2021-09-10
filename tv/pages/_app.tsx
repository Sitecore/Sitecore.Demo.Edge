import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="screen">
      <Head>
        <title>PLAY! Summit TV</title>
        <meta name="description" content="PLAY! Summit TV displays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div id="container">
          <div id="monitor">
            <div id="monitorscreen">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
