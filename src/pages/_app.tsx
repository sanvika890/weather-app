import type { AppProps } from "next/app";
import "../css/weather-icons.css";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
