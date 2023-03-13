import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Minichat from "../components/Minichat";
import { database } from "../firebaseConfig";

const chat = (props) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(window.localStorage.getItem("busbro-token"));
  }, [props.admin]);
  const chatToPush = {
    query: "",
    timestamp: "",
    admin: false,
  };
  const [chatData, setChatData] = useState(chatToPush);
  const databaseRef = collection(database, "chat_users");
  const [data, setData] = useState(null);
  useEffect(() => {
    const q = query(databaseRef, orderBy("timestamp"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });

    return unsub;
  }, []);
  const handlesubmit = (e) => {
    e.preventDefault();

    if(chatData.query){
      addData();
    }
    // setBusData({ ...busData, route: route });
  };
  const addData = () => {
    token || props.admin ? (chatData.admin = true) : (chatData.admin = false);
    addDoc(databaseRef, { ...chatData, timestamp: serverTimestamp() })
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
    setChatData(chatToPush);
  };
  return (
    <div className="chat_interface">
      {data ? (
        <>
          <div className="chatBox">
            {data.map((query) => {
              return <Minichat chat={query.query} admin={query.admin} />;
            })}
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="chatDiv">
        <form onSubmit={handlesubmit}>

          <div className="search__container chat__container">
            <img
              src="./static/send_bus.svg"
              alt="search-icon"
              className="search__img chat__img"
              onClick={handlesubmit}
            />
            <input
              type="text"
              onChange={(e) => {
                setChatData({ query: e.target.value });
              }}
              value={chatData.query}
              className="search chat__input"
              placeholder="ask your query here..."
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default chat;
