import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/global.css";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      <Head>
        <meta name="description" content="Weather Forecast App" />
        <meta name="author" content="Gabriel Longás Calvo" />

        <title>Weather Forecast</title>

        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
