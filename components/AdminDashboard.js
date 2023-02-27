import { getAuth } from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
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
import moment from "moment";

const AdminDashboard = ({ admin, setAdmin }) => {
  const auth = getAuth();
  const dataToPush = {
    busNumber: "",
    busPlateNumber: "",
    driver: ["", ""],
    GSMMobile: "",
    route: ["", "", ""],
    search: "",
    img: "",
    exam : ""
  };
  const submitBtn = useRef(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imgurl, setImgurl] = useState(null);
  const [busData, setBusData] = useState(dataToPush);
  const databaseRef = collection(database, "buses");
  const [data, setData] = useState(null);
  const [exam, setExam ]= useState(null);
  // const [route, setRoute] = useState(["", "", ""]);
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
  const handleRadio = (e) => {
    setExam(e.target.value);
  }

  // var diff = Math.abs(new Date() - compareDate);

  // modiff(moment('2010-10-20'), 'days');

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
    // console.log('----------------imgUploadmoment().format('MMMM Do YYYY, h:mm:ss a');d-----------------',imageUpload.name);
    // fetch('https://worldtimeapi.org/api/ip')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     settime(data.datetime);
    //   });

    // give serverTimestamp() in firebase

    // let dateTime = new Date();git 
    let dateTime=moment().format('');
    //console.log('----------------date-----------------',dateTime);

    addDoc(databaseRef, {
      ...busData,
      search: search,
      img: "driver-p-3.svg",
      timestamp: dateTime,
      exam : exam
    })
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
    setBusData({ ...busData, route: [...busData.route, ""] });
  };
  const routeChange = (e) => {
    let temp = [...busData.route];
    let ind = parseInt(e.target.name);
    temp[ind] = e.target.value;
    // console.log({temp, ind,route});
    setBusData({ ...busData, route: temp });
  };
  const deleteRoute = (e) => {
    e.preventDefault();
    let temp = [...busData.route];
    let ind = parseInt(e.target.name);
    temp.splice(ind, 1);
    // setRoute(temp);
    setBusData({ ...busData, route: temp });
  };
  const validateBus = (e) => {
    let flag = false;
    data?.map((item) => {
      if (item.busNumber == e.target.value) {
        flag = true;
      }
    });
    if (flag) {
      alert("busNumber already exist");
    } else {
      setBusData({ ...busData, busNumber: e.target.value });
    }
  };
  return (
    <>
      <Head>
        <title>Bus Bro | Admin</title>
      </Head>
      <div className="AdminDashHead">
        <h3 className="amHeading">Admin Dashboard</h3>
        <div className="verticalLine"></div>
        <button
        className="signOutBtn"
          onClick={() => {
            auth.signOut();
            setAdmin(null);
            window.localStorage.removeItem("busbro-token");
            window.location.reload();
          }}
        >
          Sign Out
        </button>
      </div>

      <Buses admin={admin} />
        
      <div className="addBusBtnArea" >
        <div className="addBusFlex" onClick={openDialog}>
          <img src="./static/plus.svg" alt="plus" className="plusBtnAD"></img>
          <h4>Add Bus</h4>
        </div>

      </div>
      

      <dialog className="dialog">
        <div className="popUpHead">
          <h2>Add Bus</h2>
          <img
            src="./static/close.svg"
            className="cancelImg"
            onClick={(e) => closeDialog(e)}
            alt="close"
          ></img>
        </div>
        <form className="form" onSubmit={handlesubmit}>
          <div>
            <label>
              <div class="user-input-wrap">
                <br />
                <input
                  type="number"
                  className="inputText"
                  name="bus_number"
                  onChange={(e) => {
                    validateBus(e);
                  }}
                  value={busData.busNumber}
                  //required
                />
                <span class="floating-label">Bus Number</span>
              </div>
            </label>
            <label>
              <div class="user-input-wrap">
                <br />
                <input
                  type="text"
                  className="inputText"
                  name="bus_plate_number"
                  onChange={(e) => {
                    setBusData({ ...busData, busPlateNumber: e.target.value });
                  }}
                  value={busData.busPlateNumber}
                  //required
                />
                <span class="floating-label">Bus Plate Number</span>
              </div>
            </label>
            <label>
              <div class="user-input-wrap">
                <br />
                <input
                  type="text"
                  className="inputText"
                  name="gsm_mobile_number"
                  onChange={(e) => {
                    setBusData({ ...busData, GSMMobile: e.target.value });
                  }}
                  value={busData.GSMMobile}
                  pattern="^[6-9]\d{9}$"
                  //required
                />
                <span class="floating-label">GSM mobile</span>
              </div>
            </label>
            <label>
              <div >
                <br></br>
                <span class="floating-label">Exam</span>&nbsp;&nbsp;
                <input type="radio" value="yes" name="yes_no" onChange={(e)=>{handleRadio(e)}}></input>Yes &nbsp;
                <input type="radio" value="no" name="yes_no" onChange={(e)=>{handleRadio(e)}}></input>No
                <br></br>
                <br></br>
              </div>
            </label>

            <h4>Driver Details</h4>
            <div className="driverDetail">
              <label>
                <div class="user-input-wrap">
                  <br />
                  <input
                    type="text"
                    className="inputText"
                    name="mobile_number"
                    onChange={(e) => {
                      setBusData({
                        ...busData,
                        driver: [busData.driver[0], e.target.value],
                      });
                    }}
                    value={busData.driver[1]}
                    pattern="^[6-9]\d{9}$"
                    //required
                  />
                  <span class="floating-label">Mobile Number</span>
                </div>
              </label>

              <label>
                <div class="user-input-wrap">
                  <br />
                  <input
                    type="text"
                    className="inputText"
                    name="Name_number"
                    onChange={(e) => {
                      setBusData({
                        ...busData,
                        driver: [e.target.value, busData.driver[1]],
                      });
                    }}
                    value={busData.driver[0]}
                    //required
                  />
                  <span class="floating-label">Driver Name</span>
                </div>
              </label>
              <br />
              <label>
                <span className="driverPhoto">Driver Photo</span>
                <br></br>
                <input
                  type="file"
                  onChange={(e) => setImageUpload(e.target.files[0])}
                  //required
                />
              </label>
            </div>

            <h4>Route</h4>
            <div className="dynamic-bus-add-delete">
              {busData.route.map((item, index) => {
                return (
                  <>
                    <div className="routesArea">
                      <div class="user-input-wrap">
                        <br />
                        <input
                          type="text"
                          className="inputText"
                          name={index}
                          onChange={(e) => routeChange(e)}
                          value={item}
                          //required
                        />
                        <span class="floating-label">Route {index + 1}</span>
                      </div>

                      <img
                        src="./static/minus.svg"
                        alt="delete"
                        className="delete-route"
                        style={{
                          display:
                            busData.route.length === 3 ? "none" : "inline",
                        }}
                        onClick={(e) => {
                          deleteRoute(e);
                        }}
                      ></img>
                    </div>
                  </>
                );
              })}
            </div>
            <br />
            <div className="addArea">
              <img
                src="./static/plus.svg"
                className="addBtn"
                onClick={(e) => clickAdd(e)}
              ></img>
            </div>

            <br />

            <div className="submitCancel">
              <input
                className="popUpSubmit"
                type="submit"
                ref={submitBtn}
              ></input>
            </div>
          </div>
        </form>
      </dialog>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default AdminDashboard;
