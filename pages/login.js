import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useEffect } from "react";
import { app } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import eyeOpen from "../public/images/eye-open.svg";
import eyeClose from "../public/images/eye-close.svg";

const Login = (props) => {
  const auth = getAuth();
  const router = useRouter();
  const [d, setd] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        props.setAdmin(response.user);
        window.localStorage.setItem("busbro-token", response.user.uid);
      })
      .catch((err) => {
        alert("Not A Valid User");
      });

    router.push("/");
  };
  return (
    <>
      <form className="cont minHeight" onSubmit={(e) => signIn(e)}>
        <div className="loginBox">
          <center>
            <h1 className="loginText">Login</h1>
          </center>
          <div class="user-input-wrap">
            <br />
            <input type="text"
              className="inputText"
              name=""
              id=""
              onChange={(event) => setEmail(event.target.value)}

              required />
            <span class="floating-label">Email</span>
          </div>

          <div className="show-password">
            <div class="user-input-wrap">
              <br />
              <input type={showPassword ? "text" : "password"}
                className="inputText"
                name=""
                id=""
                onChange={(event) => setPassword(event.target.value)}
                required />
              <span class="floating-label">Password</span>
            </div>

            
            <Image
              className="eye"
              src={showPassword ? eyeClose : eyeOpen}
              alt="eye-open"
              onClick={showPassword ? () => setShowPassword(false) : () => setShowPassword(true)}
            />
          </div>
          <br></br>
          
          <div className="submitCancel">
              <input className="popUpSubmit" type="submit"></input>
            </div>
        </div>
      </form>
    </>
  );
};

export default Login;
