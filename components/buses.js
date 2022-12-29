import Head from "next/head";
import { useEffect, useState } from "react";
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

function Buses({ admin }) {
  const databaseRef = collection(database, "buses");
  const [data, setData] = useState(null);


// onsnapshot
    useEffect(() => {
        const unsub = onSnapshot(databaseRef, (querySnapshot) => {
            setData(querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        });
        
        return unsub;
    },[])

    useEffect(() => {
        console.log(data);
    }, [data])

  return (
    <>
      <h2>search</h2>
      <input type="text" className="search" />

      {data ? (
        data.map((bus) => {
          return <Bus bus={bus} admin={admin} />;
        })
      ) : (
        <div class="loader" style={{ marginTop: "3rem" }}></div>
      )}
    </>
  );
}

export default Buses;
