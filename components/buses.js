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

function Buses({ admin }) {
  const databaseRef = collection(database, "buses");
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("")


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
const filteredItems = useMemo(() => {
    return data?.filter(item => {
      return item.search.toLowerCase().includes(query.toLowerCase())
    })
  }, [data, query])
  return (
    <>
      <h2>search</h2>
      <input type="search" onChange={e=>setQuery(e.target.value)} value={query} className="search" />

      {filteredItems ? (
        filteredItems.map((bus) => {
          return <Bus bus={bus} admin={admin} />;
        })
      ) : (
        <div class="loader" style={{ marginTop: "3rem" }}></div>
      )}
    </>
  );
}

export default Buses;
