import { AppProps } from "next/app";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
