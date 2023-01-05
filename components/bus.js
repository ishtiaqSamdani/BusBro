import Link from 'next/link'
import React, { useState } from 'react'
import Router from 'next/router'
import { collection } from 'firebase/firestore';
import { doc, onSnapshot } from "firebase/firestore";

import { database } from '../firebaseConfig';
import { setRevalidateHeaders } from 'next/dist/server/send-payload';

const Bus = (props) => {
    const bus = props.bus;
    // console.log(bus)
    const pushData = () => {
        Router.push(
            {
                pathname: '/view-more',
                query: {
                    busNumber: bus.busNumber,
                    admin: props.admin
                }
            }
        )
    }
    // const unsub = onSnapshot(doc(database, "buses", bus.id), (doc) => {
    //     console.log("Current data: ", doc.data());
    //     setbus(doc.data())
    // });

    let route = bus.route;
    route = [route[0],route[Math.floor(route.length/2)],route[route.length-1]];
    
    return (
        <>
            <div style={{ "backgroundColor": "hotpink", 'color': '#333', 'width': '50vw', "margin": '3rem' }}>
                <h1 className="bus_number">
                    {bus.busNumber}
                </h1>

                {route.map((item)=>{
                    return(
                    <h3>{item} {`-->`}</h3> 
                    )
                })}

                <button>
                    <a onClick={() => { pushData() }}>view more...</a>


                </button>


            </div>


        </>
    )
}

export default Bus

