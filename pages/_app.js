import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../components/navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const expand = () => {
    //console.log("rem");
    const theme = document.querySelector(".theme_expanded");
    theme.classList.toggle("expanded");
  };
  const [admin, setAdmin] = useState(null);
  const router = useRouter();
  return <>
    <Head>
      <title>Bus Bro</title>
      <link rel="shortcut icon" href="/images/bus.png" />
    </Head>
    <Navbar admin={admin} setAdmin={setAdmin} />
    <Component {...pageProps} admin={admin} setAdmin={setAdmin} />
    <div className="theme_expanded">
      <div className="theme_icon">
        <img className="moon icon icon-shadow" src="./static/moon.svg" alt="" onClick={expand} />
        {/* <img className="moon" src="./static/moon2.svg" alt="" srcset="" /> */}
        {/* <svg
          className="moon"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
        >
          <path d="M24 42q-7.5 0-12.75-5.25T6 24q0-7.5 5.25-12.75T24 6q.4 0 .85.025.45.025 1.15.075-1.8 1.6-2.8 3.95-1 2.35-1 4.95 0 4.5 3.15 7.65Q28.5 25.8 33 25.8q2.6 0 4.95-.925T41.9 22.3q.05.6.075.975Q42 23.65 42 24q0 7.5-5.25 12.75T24 42Zm0-3q5.45 0 9.5-3.375t5.05-7.925q-1.25.55-2.675.825Q34.45 28.8 33 28.8q-5.75 0-9.775-4.025T19.2 15q0-1.2.25-2.575.25-1.375.9-3.125-4.9 1.35-8.125 5.475Q9 18.9 9 24q0 6.25 4.375 10.625T24 39Zm-.2-14.85Z" />
        </svg> */}
      </div>
      <div className="theme_inputs">
        <input
          type="radio"
          name="theme"
          id="light"
          className="theme_ops"
          checked
        />
        <input type="radio" className="theme_ops" name="theme" id="dark" />
      </div>
    </div>

    <div className="footer">
      <div className="center_footer">

      <p>Made with </p>
      <img src="./static/love.svg" alt="love" className="loveImg"></img>
      </div>
      
    </div>
  </>;
}

export default MyApp;
