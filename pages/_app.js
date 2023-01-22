import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [admin, setAdmin] = useState(null);
  return<>
  <Head>
    <title>Bus Bro</title>
  <link rel="shortcut icon" href="/images/bus.png" />
  </Head>
    <Navbar admin={admin} setAdmin={setAdmin} />
    <Component {...pageProps} admin={admin} setAdmin={setAdmin} />
    <div className="footer">
        <p>Made with </p>
        <img src="./static/love.svg" alt="love" className="loveImg"></img>
      </div>
  </>;
}

export default MyApp;
