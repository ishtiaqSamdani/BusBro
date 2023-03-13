import { getAuth } from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { database } from "../firebaseConfig";


const chat = () => {
    const chatToPush = {
        query : "",
    };
    const [chatData,setChatData] = useState(chatToPush);
    const databaseRef = collection(database, "chat_users");
    const [data,setData] = useState(null);
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
    const handlesubmit = (e) => {
        e.preventDefault();
        // setBusData({ ...busData, route: route });
        addData();
      };
    const addData = () =>{
        addDoc(databaseRef, 
            chatData,
          )
            .then(() => {
              
              
            })
            .catch((err) => {
              console.error(err);
            });
            setChatData(chatToPush)         
    }
  return (
    <>
    {data?(
        <>
        <div className="chatBox">
            {data.map((query)=>{
                return <h4 className="queryBox">{query.query}</h4>
            })}
            </div>
        </>
    ):(<></>)}
    <div className='chatDiv'>
        
        <h3>Chat</h3>
        <form onSubmit={handlesubmit}>
            <input type="text" placeholder='Type your query here...'
            autoFocus
             onChange={(e)=>{
                setChatData({  query: e.target.value })
            }}
            value={chatData.query}></input>
            <button type='submit' 
                >Submit</button>
        </form>
        </div>
    </>
  )
}

export default chat