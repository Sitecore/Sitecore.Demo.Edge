import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="screen">
      <Head>
        <title>PLAY! Summit TV</title>
        <meta name="description" content="PLAY! Summit Kiosk" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="temp-wrapper temp-wrapper--wider">
          <div className="px px--ls">
            <div className="px__body"></div>

            <div className="px__screen">
              <div className="px__screen__">
                <div className="px__screen__frame">
                  <Component {...pageProps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
