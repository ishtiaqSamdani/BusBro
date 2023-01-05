import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import Router, { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { database } from "../firebaseConfig";

const viewMore = (props) => {
  const dataToPush = {
    busNumber: "",
    busPlateNumber: "",
    driver: ["", ""],
    GSMMobile: "",
    route: ["", "", ""],
    img: "",
  };
  const inpTemp = {
    busNumber: true,
    busPlateNumber: true,
    driver: [true, true],
    GSMMobile: true,
    route: [true, true, true],
    img: true,
  };
  const [busData, setBusData] = useState(dataToPush);
  const [inpChecker, setInpChecker] = useState(inpTemp);
  const [data, setData] = useState(null);
  const [updatedImg,setUpdatedImg] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const router = useRouter();
  const busNumber = router.query.busNumber;
  const singleBus = data
    ? data.find((bus) => {
        return bus.busNumber == busNumber;
      })
    : null;
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(window.localStorage.getItem("busbro-token"));
  }, [props.admin]);

  useEffect(() => {
    if (singleBus) {
      setBusData(singleBus);
      console.log(singleBus.id);
    }
  }, [data]);
  // console.log(busData);
  const openDialog = () => {
    document.querySelector(".dialog").showModal();
  };
  const closeDialog = (e) => {
    e.preventDefault();
    setBusData(singleBus);
    document.querySelector(".dialog").close();
  };
  const handlesubmit = (e) => {
    e.preventDefault();

    updateFields();
    closeDialog(e);
  };

  const updateFields = () => {
    let fieldToEdit = doc(database, "buses", singleBus.id);
    let search = busData.busNumber + ",";
    busData.route.map((item, index) => {
      if (item !== "") {
        search += item + ",";
      }
    });
    updateDoc(fieldToEdit, { ...busData, search: search })
      .then(() => {
        alert("Data Updated");
        Router.push("/");
        // getData()
        // setName('')
        // setAge(null)
        // setIsUpdate(false)
      })
      .catch((err) => {
        alert(err);
      });
  };
  const updateImg = async (e) => {
    e.preventDefault();
    let fieldToEdit = doc(database, "buses", singleBus.id);
    // let search = busData.busNumber + ",";
    // busData.route.map((item, index) => {
    //   if (item !== "") {f
    //     search += item + ",";
    //   }
    // });
    await uploadFile();
    updateDoc(fieldToEdit, { ...busData, img:updatedImg.name})
      .then(() => {
        alert("Data Updated");
        Router.push("/");
        // getData()
        // setName('')
        // setAge(null)
        // setIsUpdate(false)
      })
      .catch((err) => {
        alert(err);
      });
      const updateImgDialog= document.querySelector(".img-update");
      updateImgDialog.close();
      
  };

  const databaseRef = collection(database, "buses");

  const getData = async () => {
    await getDocs(databaseRef).then((response) => {
      setData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
    // console.log('---------------------data img ------------------',data?.img);
  };
  useEffect(() => {
    getData();
  }, []);

  singleBus?.img
    ? getDownloadURL(ref(storage, `drivers/${singleBus.img}`)).then((url) => {
        setImgSrc(url);
      })
    : null;

  const clickAdd = (e) => {
    e.preventDefault();
    // setRoute([...route, ""]);
    setBusData({ ...busData, route: [...busData.route, ""] });
  };
  const uploadFile = async () => {
    if (updatedImg == null) return;
    const imageRef = ref(storage, `drivers/${updatedImg.name}`);
    await uploadBytes(imageRef, updatedImg);
  };

  const UpdatePicBtn =()=>{
    const updateImgDialog= document.querySelector(".img-update");
    updateImgDialog.showModal();
  }
  const closeModal = (e) => {
    e.preventDefault();
    const updateImgDialog= document.querySelector(".img-update");
    updateImgDialog.close();
  }

  return (
    <>
      <h4>View More</h4>
      <br></br>
     

      <div style={{ margin: "2rem" }}>
        {/* a tag for tel ph number */}
        {/* <a href={`tel:${singleBus?.GSMMobile}`}></a> */}

        {/* <a href={`sms:+916281805011?&body=Location`}>Track </a> */}

        <h1>{singleBus?.busNumber}</h1>
        <h3>{singleBus?.GSMMobile}</h3>

        <h3>{singleBus?.busPlateNumber}</h3>

        <br></br>
        <h3>{singleBus?.driver[0]}</h3>
        <h3>{singleBus?.driver[1]}</h3>
        <img src={imgSrc} alt="error" style={{ width: "13rem" }} />
        <br />
        {(props.admin || token) && (
          <>
            <button className="update_pic" onClick={UpdatePicBtn}>
              Update pic
            </button>
          </>
        )}

        {singleBus?.route.map((rt) => {
          return <li>{rt}</li>;
        })}
      </div>

      {(props.admin || token) && (
        <>
          <button className="add_bus" onClick={openDialog}>
            Update Bus
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
                    setInpChecker({ ...inpChecker, busNumber: false });
                  }}
                  value={
                    inpChecker.busNumber
                      ? singleBus?.busNumber
                      : busData.busNumber
                  }
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
                    setInpChecker({ ...inpChecker, busPlateNumber: false });
                  }}
                  value={
                    inpChecker.busPlateNumber
                      ? singleBus?.busPlateNumber
                      : busData.busPlateNumber
                  }
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
                      driver: [busData.driver[0], e.target.value],
                    });
                    setInpChecker({
                      ...inpChecker,
                      driver: [inpChecker.driver[0], false],
                    });
                  }}
                  value={
                    inpChecker.driver[1]
                      ? singleBus?.driver[1]
                      : busData.driver[1]
                  }
                  pattern="^[6-9]\d{9}$"
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
                    setInpChecker({ ...inpChecker, GSMMobile: false });
                  }}
                  value={
                    inpChecker.GSMMobile
                      ? singleBus?.GSMMobile
                      : busData.GSMMobile
                  }
                  pattern="^[6-9]\d{9}$"
                  required
                />
              </label>
              <h2>Route</h2>
              {busData.route.map((rt, index) => {
                return (
                  <div>
                    <input
                      type="text"
                      name="route"
                      onChange={(e) => {
                        setBusData({
                          ...busData,
                          route: [
                            ...busData.route.slice(0, index),
                            e.target.value,
                            ...busData.route.slice(index + 1),
                          ],
                        });
                        setInpChecker({
                          ...inpChecker,
                          route: [
                            ...inpChecker.route.slice(0, index),
                            false,
                            ...inpChecker.route.slice(index + 1),
                          ],
                        });
                      }}
                      value={
                        inpChecker.route[index]
                          ? singleBus?.route[index]
                          : busData.route[index]
                      }
                      required
                    />
                    <button
                      style={{
                        display: busData.route.length === 3 ? "none" : "inline",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setBusData({
                          ...busData,
                          route: [
                            ...busData.route.slice(0, index),
                            ...busData.route.slice(index + 1),
                          ],
                        });
                        setInpChecker({
                          ...inpChecker,
                          route: [
                            ...inpChecker.route.slice(0, index),
                            ...inpChecker.route.slice(index + 1),
                          ],
                        });
                      }}
                    >
                      delete
                    </button>
                  </div>
                );
              })}
              <br />
              <button className="add" onClick={(e) => clickAdd(e)}>
                add
              </button>
              <br />
              <input type="submit"></input>
              <button onClick={(e) => closeDialog(e)}>cancel</button>
            </form>
          </dialog>

          <dialog className="img-update">
            <form className="form_img">
              <input type="file" onChange={(e)=>{setUpdatedImg(e.target.files[0])}} className="update_file" />
              <br />
              <input type="submit" onClick={(e)=>updateImg(e)}/>
              <button className="cancel" onClick={(e)=>closeModal(e)}>cancel</button>
            </form>
          </dialog>
        </>
      )}
    </>
  );
};

export default viewMore;
