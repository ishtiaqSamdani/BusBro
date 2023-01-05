import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { database } from "../firebaseConfig";
import Buses from "./buses";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebaseConfig";

const AdminDashboard = ({ admin, setAdmin }) => {
  const auth = getAuth();
  const dataToPush = {
    busNumber: "",
    busPlateNumber: "",
    driver: ["", ""],
    GSMMobile: "",
    route: ["", "", ""],
    search: "",
    img : ""
  };
  const submitBtn = useRef(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imgurl,setImgurl] = useState(null);
  const [busData, setBusData] = useState(dataToPush);
  const databaseRef = collection(database, "buses");
  // const [route, setRoute] = useState(["", "", ""]);
  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `drivers/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);
  };
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

  const addData = async () => {
    submitBtn.current.disabled = true;
    submitBtn.current.innerText = "Uploading...";
    await uploadFile();
    submitBtn.current.innerText = "uploaded";
    submitBtn.current.disabled = false;
    let search = busData.busNumber + ",";
    busData.route.map((item, index) => {
      if (item !== "") {
        search += item + ",";
      }
    });
    // console.log('-------------------------temp-------------------',temp);
    // setImgurl(temp);
    // console.log('-------------------------url-------------------',imgurl);
    // console.log("awiat eorking");
    console.log('----------------imgUpload-----------------',imageUpload.name);
    addDoc(databaseRef, { ...busData, search: search,img:imageUpload.name})
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
          window.location.reload();
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
              type="number"
              name="bus_number"
              onChange={(e) => {
                setBusData({ ...busData, busNumber: e.target.value });
              }}
              value={busData.busNumber}
               required

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
               required

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
                  ],
                });
              }}
              value={busData.driver[1]}
              pattern="^[6-9]\d{9}$"
               required

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
                  ],
                });
              }}
              value={busData.driver[0]}
               required

            />
          </label>
          <br />
          <label>
            Driver photo:
            <input
              type="file"
              onChange={(e)=> setImageUpload(e.target.files[0]) }
               required

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
              pattern="^[6-9]\d{9}$"
               required

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
                   required

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

          <input type="submit" ref={submitBtn}></input>

  

          <button onClick={(e) => closeDialog(e)}>cancel</button>
        </form>
      </dialog>
    </>
  );
};

export default AdminDashboard;