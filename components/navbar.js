import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
    const showList = () => {
        const list = document.querySelector('.list');
        list.classList.toggle('active');
    }
  const router = useRouter();
  return (
    <header>
      <nav className="navbar">
        <div className="navbar__logo" >
          <img className="logo" src="./static/nav-bus-logo.svg" alt="logo"/>
        </div>

        <div className="burger-menu">
          <img src="./static/burger-menu.svg" alt="" onClick={showList}/>
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
          <li className="list__item"><div className="login__text">About</div></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
