import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import Buses from "./buses";

const AdminDashboard = ({ admin, setAdmin }) => {
  const auth = getAuth();
  const dataToPush = {
    busNumber: "",
    busPlateNumber: "",
    driver: ["", "", ""],
    GSMMobile: "",
    route: ["", "", ""],
    search: "",
  };
  const [busData, setBusData] = useState(dataToPush);
  const databaseRef = collection(database, "buses");
  // const [route, setRoute] = useState(["", "", ""]);
  const openDialog = () => {
    document.querySelector(".dialog").showModal();
  };
  const closeDialog = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").close();
    setBusData(dataToPush);
    // setRoute(["", "", ""]);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    // setBusData({ ...busData, route: route });
    addData();
    closeDialog(e);
  };

  const addData = () => {
    let search = busData.busNumber + ",";
    busData.route.map((item, index) => {
      if (item !== "") {
        search += item + ",";
      }
    });
    console.log(search);
    addDoc(databaseRef, { ...busData, search: search})
      .then(() => {
        alert("Data Sent");
        // getData()
        // setName('')
        // setAge(null)
      })
      .catch((err) => {
        console.error(err);
      });
    setBusData(dataToPush);
  };
  const clickAdd = (e) => {
    e.preventDefault();
    // setRoute([...route, ""]);
    setBusData({...busData, route: [...busData.route, ""]});
  };
  const routeChange = (e) => {
    let temp = [...busData.route];
    let ind = parseInt(e.target.name);
    temp[ind] = e.target.value;
    // console.log({temp, ind,route});
    setBusData({...busData, route: temp});
  };
  const deleteRoute = (e) => {
    e.preventDefault();
    let temp = [...busData.route];
    let ind = parseInt(e.target.name);
    temp.splice(ind, 1);
    // setRoute(temp);
    setBusData({...busData, route: temp});
  };
  return (
    <>
    <Head>
        <title>Bus Bro | Admin</title>
    </Head>
      <h1>Admin</h1>
      <button
        onClick={() => {
          auth.signOut();
          setAdmin(null);
          window.localStorage.removeItem("busbro-token");
        }}
      >
        Sign Out
      </button>

      <Buses admin={admin} />

      <button className="add_bus" onClick={openDialog}>
        Add Bus
      </button>

      <dialog className="dialog">
        <form className="form" onSubmit={handlesubmit}>
          <label>
            Bus Number:
            <input
              type="text"
              name="bus_number"
              onChange={(e) => {
                setBusData({ ...busData, busNumber: e.target.value });
              }}
              value={busData.busNumber}
            />
          </label>
          <br />
          <label>
            Bus Plate Number
            <input
              type="text"
              name="bus_plate_number"
              onChange={(e) => {
                setBusData({ ...busData, busPlateNumber: e.target.value });
              }}
              value={busData.busPlateNumber}
            />
          </label>
          <br />
          <h2>Driver Details</h2>
          <label>
            Mobile Number:
            <input
              type="text"
              name="mobile_number"
              onChange={(e) => {
                setBusData({
                  ...busData,
                  driver: [
                    busData.driver[0],
                    e.target.value,
                    busData.driver[2],
                  ],
                });
              }}
              value={busData.driver[1]}
            />
          </label>

          <br />
          <label>
            Driver Name:
            <input
              type="text"
              name="Name_number"
              onChange={(e) => {
                setBusData({
                  ...busData,
                  driver: [
                    e.target.value,
                    busData.driver[1],
                    busData.driver[2],
                  ],
                });
              }}
              value={busData.driver[0]}
            />
          </label>
          <br />
          <label>
            Driver photo:
            <input
              type="file"
              name={"1"}
              onChange={(e) => {
                setBusData({
                  ...busData,
                  driver: [
                    busData.driver[0],
                    busData.driver[1],
                    e.target.value,
                  ],
                });
              }}
              value={busData.driver[2]}
            />
          </label>
          <br />
          <br />
          <label>
            GSM mobile
            <input
              type="text"
              name="gsm_mobile_number"
              onChange={(e) => {
                setBusData({ ...busData, GSMMobile: e.target.value });
              }}
              value={busData.GSMMobile}
            />
          </label>
          <h2>Route</h2>
          <div className="dynamic-bus-add-delete">
          {busData.route.map((item, index) => {
            return (
              <>
                <input
                  type="text"
                  name={index}
                  onChange={(e) => routeChange(e)}
                  value={item}
                />
                <button
                  className="delete-route"
                  name={index}
                  onClick={(e) => {
                    deleteRoute(e);
                  }}
                  style={{ display: busData.route.length === 3 ? "none" : "inline" }}
                >
                  delete
                </button>
                <br />
              </>
            );
        })}
        </div>
          <br />
          <button className="add" onClick={(e) => clickAdd(e)}>
            add
          </button>
          <br />
          <br />

          <input type="submit"></input>

          <button onClick={(e) => closeDialog(e)}>cancel</button>
        </form>
      </dialog>
    </>
  );
};

export default AdminDashboard;
