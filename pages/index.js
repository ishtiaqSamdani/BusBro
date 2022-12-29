import { getAuth } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { app } from "../firebaseConfig";
import Buses from "../components/buses";
import AdminDashboard from "../components/AdminDashboard";
import { useEffect, useState } from "react";

export default function Home(props) {
  const auth = getAuth();

  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(window.localStorage.getItem("busbro-token"));
  }, [props.admin]);

  return (
    <>
      {token || props.admin ? (
        <>
          <AdminDashboard admin={props.admin} setAdmin={props.setAdmin} />
        </>
      ) : (
        <>
          <Buses admin={props.admin} />
        </>
      )}
    </>
  );
}
