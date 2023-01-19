import {
  addDoc,
  collection,
  deleteDoc,
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
  const [updatedImg, setUpdatedImg] = useState(null);
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
      // console.log(singleBus.id);
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
  const openDeleteDialog = (e) => {
    document.querySelector(".delete-bus").showModal();
  }
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
    updateDoc(fieldToEdit, { ...busData, img: updatedImg.name })
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
    const updateImgDialog = document.querySelector(".img-update");
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

  const UpdatePicBtn = () => {
    const updateImgDialog = document.querySelector(".img-update");
    updateImgDialog.showModal();
  }
  const closeModal = (e) => {
    e.preventDefault();
    const updateImgDialog = document.querySelector(".img-update");
    updateImgDialog.close();
  }

  const deleteBus = (e) => {
    e.preventDefault();
    deleteDoc(doc(database, "buses", singleBus.id));
    router.push("/");
  }

  const closeModalDeleteBus = (e) => {
    e.preventDefault();
    const deleteBusDialog = document.querySelector(".delete-bus");
    deleteBusDialog.close();
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
        {
          busData.img ? <img src={imgSrc} alt={`bus_driver_${singleBus?.busNumber}`} style={{ width: "13rem" }} /> : <p>loading</p>
        }

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
          <br />
          <button onClick={() => { openDeleteDialog() }}>
            Delete Bus
          </button>

          <dialog className="dialog">
            <div className="popUpHead">
              <h2>Update Bus</h2>
              <img src="./static/close.svg" className="cancelImg" onClick={(e) => closeDialog(e)} alt="close"></img>
            </div>
            <form className="form" onSubmit={handlesubmit}>
              <label>
                <div class="user-input-wrp">
                  <br />
                  <input type="number"
                    className="inputText"
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
                    required />
                  <span class="floating-label">Bus Number</span>
                </div>
              </label>

              <label>
                <div class="user-input-wrp">
                  <br />
                  <input type="text"
                    className="inputText"
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
                    required />
                  <span class="floating-label">Bus Plate Number</span>
                </div>
              </label>
              <label>
                <div class="user-input-wrp">
                  <br />
                  <input type="text"
                    className="inputText"
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
                    required />
                  <span class="floating-label">GSM mobile</span>
                </div>
              </label>
              <br />
              <h4>Driver Details</h4>
              <div className="driverDetail">
                <label>
                  <div class="user-input-wrp">
                    <br />
                    <input type="text"
                      className="inputText"
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
                      required />
                    <span class="floating-label">Mobile Number</span>
                  </div>
                </label>

                <label>
                  <div class="user-input-wrp">
                    <br />
                    <input type="text"
                      className="inputText"
                      name="Name_number"
                      onChange={(e) => {
                        setBusData({
                          ...busData,
                          driver: [busData.driver[1], e.target.value],
                        });
                        setInpChecker({
                          ...inpChecker,
                          driver: [inpChecker.driver[1], false],
                        });
                      }}
                      value={
                        inpChecker.driver[0]
                          ? singleBus?.driver[0]
                          : busData.driver[0]
                      }
                      required />
                    <span class="floating-label">Driver Name</span>
                  </div>

                </label>
              </div>


              <h4>Route</h4>
              {busData.route.map((rt, index) => {
                return (
                  <>
                    <div className="routesArea">
                      <div class="user-input-wrap">
                        <br />
                        <input type="text"
                          className="inputText"
                          name={index}
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
                          required />
                        <span class="floating-label">Route {index + 1}</span>
                      </div>

                      <img src="./static/minus.svg" alt="delete"
                        className="delete-route"
                        style={{ display: busData.route.length === 3 ? "none" : "inline" }}
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
                        }}></img>

                    </div>

                  </>

                );
              })}
              <br />
              <div className="addArea">
                <img src="./static/plus.svg" className="addBtn" onClick={(e) => clickAdd(e)} ></img>
              </div>
              <br />
              <div className="submitCancel">
                <input className="popUpSubmit" type="submit" value="Update"></input>
              </div>
            </form>
          </dialog>

          <dialog className="img-update">
            <div className="popUpHead">
              <h2>Update Photo</h2>
              <img src="./static/close.svg" className="cancelImg" onClick={(e) => closeModal(e)} alt="close"></img>
            </div>
            <form className="form_img">
              <input type="file" onChange={(e) => { setUpdatedImg(e.target.files[0]) }} className="update_file" />
              <br />
              <br></br>
              <div className="submitCancel">
                <input type="submit" className="popUpSubmit" value="Update" onClick={(e) => updateImg(e)} />
              </div>

            </form>
          </dialog>

          <dialog className="delete-bus">
            <form className="form_delete">
              <h2>Are you sure you want to delete this bus?</h2>
              <div className="deleteImgArea">
                <button className="deleteImgBtn" onClick={(e) => deleteBus(e)}>Yes,Delete</button>
                <button className="deleteImgBtn" onClick={(e) => closeModalDeleteBus(e)}>cancel</button>
              </div>
            </form>
          </dialog>
        </>
      )}
    </>
  );
};

export default viewMore;
