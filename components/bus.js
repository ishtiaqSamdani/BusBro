import Link from "next/link";
import React, { useState } from "react";
import Router from "next/router";
import { collection } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

import { database } from "../firebaseConfig";
import { setRevalidateHeaders } from "next/dist/server/send-payload";

const Bus = (props) => {
  const bus = props.bus;
  const moment = require("moment");
  let momentA = moment(props.bus.timestamp);
  let days = moment(moment().format('')).diff(momentA, "days");
  let hours = moment(moment().format('')).diff(momentA, "hours");
  let minutes = moment(moment().format('')).diff(momentA, "minutes");

  //console.log("----------------date-----------------", hours, days, minutes);
  // console.log(bus)
  // console.log('--------------------momentA--------------------',momentA);
  const timeDiff =
    new Date().getDate() - new Date(props.bus.timestamp).getDate();
  const pushData = () => {
    Router.push({
      pathname: "/view-more",
      query: {
        busNumber: bus.busNumber,
        admin: props.admin,
      },
    });
  };
  // const unsub = onSnapshot(doc(database, "buses", bus.id), (doc) => {
  //     console.log("Current data: ", doc.data());
  //     setbus(doc.data())
  // });

  let route = bus.route;
  route = [
    route[0],
    route[Math.floor(route.length / 2)],
    route[route.length - 1],
  ];

  return (
    <>
      {
        props.istable ? (
          <>
  <tr>{bus.busNumber}</tr>
          

          </>
        ) : (
          <>
            <div className="busContainer">
              <div className="busNumUpdate">
                <h1 className="bus_number busNumBox">{bus.busNumber}</h1>
                {/* <p className="updatedBox">
            updated {timeDiff > 1 && <span>{timeDiff} days ago</span>}
            {timeDiff <= 1 && <span>today</span>}
          </p> */}
                <p className="updatedBox">
                  Updated {days > 0 && <span>{days} days </span>}
                  {(hours > 0 && hours < 24) && <span>{hours} {hours == 1 ? "hour" : "hours"} </span>}
                  {(minutes > 0 && minutes < 60) && <span>{minutes} {minutes == 1 ? "minute" : "minutes"}  </span>}
                  {(days == 0 && hours == 0 && minutes == 0) ? <span>just now</span> : <span>ago</span>}
                </p>

              </div>
              <div className="routeViewFlex">

                <div className="routesFlex">
                  <p className="routeText routeAditya">{route[0]}</p>
                  {/* <p className="routeText">{route[1]}</p> */}
                  <img className="rightArrowRoute rightArrow icon" src="./static/rightArrow.svg" alt="right"></img>
                  <p className="routeText routeHyd">{route[2] ? route[2] : route[1]}</p>
                </div>
             
              </div>
              <div className="viewMoreArea">
                  <a
                    onClick={() => {
                      pushData();
                    }}
                    className="viewMoreText"
                  >
                    view more&nbsp;
                  </a>
                  <img className="view_more-arrow icon" src="./static/rightArrow.svg" alt="right"></img>
                </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default Bus;
