import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { app, database } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Bus from "../components/bus";
import Image from "next/image";
import background from "./assets/background-buses.jpg";

function Buses({ admin }) {
  const databaseRef = collection(database, "buses");
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");

  // onsnapshot
  useEffect(() => {
    const unsub = onSnapshot(databaseRef, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });

    return unsub;
  }, []);

  const filteredItems = useMemo(() => {
    return data?.filter((item) => {
      return item.search?.toLowerCase().includes(query.toLowerCase());
    });
  }, [data, query]);
  return (
    <>
      <div className="landing__page">
        <Image className="landing__page--img" src={background} />
        <div className="search__container">
          <img src="./static/search.svg" alt="search-icon" className="search__img" />
          <input
            type="search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="search"
            placeholder="Destination or Bus Number"
          />
        </div>
      </div>

      {filteredItems ? (
        filteredItems.map((bus) => {
          return <Bus bus={bus} admin={admin} />;
        })
      ) : (
        <div className="loader" style={{ marginTop: "3rem" }}></div>
      )}
    </>
  );
}

export default Buses;
