import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Navbar = () => {
  const roter = useRouter();
  const showList = () => {
    const list = document.querySelector(".list");
    list.classList.toggle("active");
  };
  const navigateHome = () => {
    roter.push("/");
  };

  useEffect(() => {
    const header = document.querySelector("nav");
    // set propert --mt to client height
    console.log(header.clientHeight);
    document.body.style.setProperty("--mt", `${header.clientHeight}px`);
  }, []);

  const router = useRouter();
  return (
    <header>
      <nav className="navbar">
        <div className="navbar__logo">
          <img
            className="logo"
            src="./static/nav-bus-logo2.svg"
            onClick={navigateHome}
            alt="logo"
          />
{/* 
          <input
            type="radio"
            name="theme"
            id="light"
            className="theme_ops"
            checked
          />
          <input type="radio" className="theme_ops" name="theme" id="dark" /> */}
        </div>

        <div className="burger-menu">
          <img src="./static/burger-menu2.svg" alt="" onClick={showList} />
        </div>
        <ul className="list">
          <li
            className="list__item"
            onClick={() => {
              router.push("/login");
              showList();
            }}
          >
            <div className="login__text">Login</div>
          </li>
          <li className="list__item">
            <div className="login__text">About</div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
