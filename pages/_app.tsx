import { AppProps } from "next/app";
import { Helmet } from "react-helmet";
import "../styles/global.css";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      <Helmet>
        <html lang="en" />

        <meta name="description" content="Weather Forecast App" />
        <meta name="author" content="Gabriel Longás Calvo" />

        <title>Weather Forecast</title>

        <link rel="shortcut icon" href="/favicon.ico" />
      </Helmet>

      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
