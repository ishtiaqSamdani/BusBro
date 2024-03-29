import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
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
import moment from "moment";

const viewMore = (props) => {
  const dataToPush = {
    busNumber: "",
    busPlateNumber: "",
    driver: ["", ""],
    GSMMobile: "",
    route: ["", "", ""],
    img: "",
    exam: ""
  };
  const inpTemp = {
    busNumber: true,
    busPlateNumber: true,
    driver: [true, true],
    GSMMobile: true,
    route: [true, true, true],
    img: true,
    exam: true
  };
  const [busData, setBusData] = useState(dataToPush);
  const [inpChecker, setInpChecker] = useState(inpTemp);
  const [data, setData] = useState(null);
  const [updatedImg, setUpdatedImg] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const router = useRouter();
  let busNumber = router.query.busNumber;

  // const singleBus = data
  //   ? data.find((bus) => {
  //       return bus.busNumber == busNumber;
  //     })
  //   : null;
  // console.log(router.query,"======================")
  const [singleBus, setSingleBus] = useState(null)
  // use snapshot to get data

  useEffect(() => {
    let busNumber = router.query.busNumber;
    //console.log(router.query);
    // const q = query(databaseRef, where("busNumber", "==",props.busNumber));
    const unsubscribe = onSnapshot(databaseRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //console.log("lopala");
      //console.log(props);
      setSingleBus(data.find((bus) => {
        return bus.busNumber == busNumber;
      }))
    });
    return () => unsubscribe();
  }, [busNumber]);

  // useEffect(() => {

  // console.log('single bus',singleBus);
  // }, [singleBus])
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


  const [exam, setExam] = useState(singleBus?.exam);

  useEffect(() => {
    if (singleBus) {
      setExam(singleBus.exam);
    }
  }, [singleBus])
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
  };
  const handlesubmit = (e) => {
    e.preventDefault();

    updateFields();
    closeDialog(e);
  };

  const handleRadio = (e) => {
    setExam(e.target.value);
  }

  const updateFields = () => {
    let fieldToEdit = doc(database, "buses", singleBus.id);
    let search = busData.busNumber + ",";
    busData.route.map((item, index) => {
      if (item !== "") {
        search += item + ",";
      }
    });
    let dateTime = moment().format('');
    updateDoc(fieldToEdit, { ...busData, search: search, timestamp: dateTime, exam: exam })
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
  };
  const closeModal = (e) => {
    e.preventDefault();
    const updateImgDialog = document.querySelector(".img-update");
    updateImgDialog.close();
  };

  const deleteBus = (e) => {
    e.preventDefault();
    deleteDoc(doc(database, "buses", singleBus.id));
    router.push("/");
  };

  const closeModalDeleteBus = (e) => {
    e.preventDefault();
    const deleteBusDialog = document.querySelector(".delete-bus");
    deleteBusDialog.close();
  };

  const openUpdatePic = () => {
    const updateImgDialog = document.querySelector(".update_pic_dialog");
    updateImgDialog.showModal();
  }

  const closeUpdatePic = () => {
    const updateImgDialog = document.querySelector(".update_pic_dialog");
    updateImgDialog.close();
  }


  return (
    <div className="minHeight">
      {singleBus ? (
        <>

          <div className="driver__profile--container">
            <div className="driver__profile--pic--container" onClick={openUpdatePic}>
              <img
                className="driver__profile--pic icon"
                src={imgSrc}
                alt="driver pic"
              />
            </div>
            <div className="driver__profile--details">
              <div className="driver__profile--details--name">
                <img
                  className="call-img icon"
                  src="static/driverProfile.svg"
                  alt=""
                  srcset=""
                />
                <p>{singleBus?.driver[0]}</p>
              </div>
              <div className="driver__profile--details--number">
                <img
                  className="profie-img icon"
                  src="static/callDriver.svg"
                  alt=""
                  srcset=""
                />
                <a href={`tel:${singleBus?.driver[1]}`}>{singleBus?.driver[1]}</a>
              </div>
            </div>
          </div>

          <div>
            {/* a tag for tel ph number */}
            {/* <a href={`tel:${singleBus?.GSMMobile}`}></a> */}

            {/* <a href={`sms:${singleBus?.GSMMobile}?&body=Location`}>Track </a> */}

            {/* <h3>{singleBus?.driver[0]}</h3>
        <h3>{singleBus?.driver[1]}</h3>
        {busData.img ? (
          <img
            src={imgSrc}
            alt={`bus_driver_${singleBus?.busNumber}`}
            style={{ width: "13rem" }}
          />
        ) : (
          <p>loading</p>
        )} */}
            <div className="bus__details">
              <div className="bus__details--number">
                <h1 className="busNumViewD">{singleBus?.busNumber}</h1>
                {(props.admin || token) && (
                  <>
                    <div className="btn_container trackVM">

                      <img
                        src="./static/location.svg"
                        alt="location image"
                        className="location_img"
                      />

                      <a
                        className="trackVM"
                        href={`sms:${9912457345}?&body=*`}
                      >
                        Track{" "}
                      </a>

                    </div>
                  </>
                )}

              </div>
              <div className="path">
                <div class="container_">
                  <div
                    class="vertical_progress"
                    style={{ "--grid-elements": singleBus?.route.length }}
                  >
                    {/* ekada */}
                    {singleBus?.route.map((rt, index) => {
                      return (
                        <>
                          {
                            rt ? (
                              <>
                                <div
                                  style={{ "--col-row-number": `${index + 1}` }}
                                  class="progress_cards"
                                >
                                  <p>{rt}</p>
                                </div>
                              </>
                            ) : (<></>)
                          }
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="butttons">
                {(props.admin || token) && (
                  <>
                    <button className="add_bus update_btn" onClick={openDialog}>
                      Update Bus
                    </button>
                    <br />
                    <button
                      onClick={() => {
                        openDeleteDialog();
                      }}
                      className="delete_btn"
                    >
                      <p>Delete Bus</p>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="bus_plate_number">
              <span>Bus Plate Number </span>:<p>{singleBus?.busPlateNumber}</p>
            </div>
            <br />
            {/* {(props.admin || token) && (
              <>
                <button className="update_pic" onClick={UpdatePicBtn}>
                  Update pic
                </button>
              </>
            )} */}
          </div>
        </>
      ) : (
        // <div class="loader" style={{marginBottom:"100vh"}}></div>
        <img className="loader-bus" src="https://cdn.dribbble.com/users/13629280/screenshots/19734211/media/297ce93165b798b9d40c724a0e01d611.gif" alt="" srcset="" />
      )}

      <dialog className="update_pic_dialog">
        <div className="colseIconPop" onClick={closeUpdatePic}>
          <img
            src="./static/close.svg"
            className="cancelImg icon"

            alt="close"
          ></img>

        </div>

        <div className="pic_container">
          <img className="pic_container_img" src={imgSrc} alt="driver pic" />
        </div>

        {(props.admin || token) && (
          <>
            <div className="flex">

              <button className="update_pic update_btn" onClick={UpdatePicBtn}>
                Update pic
              </button>
            </div>
          </>
        )}
      </dialog>

      <dialog className="dialog">
        <div className="popUpHead">
          <h2>Update Bus</h2>
          <img
            src="./static/close.svg"
            className="cancelImg icon"
            onClick={(e) => closeDialog(e)}
            alt="close"
          ></img>
        </div>
        <form className="form" onSubmit={handlesubmit}>
          <label>
            <div class="user-input-wrap">
              <br />
              <input
                type="number"
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
                  setBusData({
                    ...busData,
                    busPlateNumber: e.target.value,
                  });
                  setInpChecker({ ...inpChecker, busPlateNumber: false });
                }}
                value={
                  inpChecker.busPlateNumber
                    ? singleBus?.busPlateNumber
                    : busData.busPlateNumber
                }

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
                  setInpChecker({ ...inpChecker, GSMMobile: false });
                }}
                value={
                  inpChecker.GSMMobile
                    ? singleBus?.GSMMobile
                    : busData.GSMMobile
                }
                pattern="^[6-9]\d{9}$"

              />
              <span class="floating-label">GSM mobile</span>
            </div>
          </label>
          <label>
            <div >
              <br></br>
              <span class="floating-label">Exam</span>&nbsp;&nbsp;
              <input type="radio" value="yes" name="yes_no" onChange={(e) => { handleRadio(e) }} checked={exam == "yes"}></input>Yes &nbsp;
              <input type="radio" value="no" name="yes_no" onChange={(e) => { handleRadio(e) }} checked={exam == "no"}></input>No
              <br></br>
              <br></br>
            </div>
          </label>
          <br />
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
                    setInpChecker({
                      ...inpChecker,
                      driver: [false, inpChecker.driver[1]],
                    });
                  }}
                  value={
                    inpChecker.driver[0]
                      ? singleBus?.driver[0]
                      : busData.driver[0]
                  }

                />
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
                    <input
                      type="text"
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

                    />
                    <span class="floating-label">Route {index + 1}</span>
                  </div>

                  <img
                    src="./static/minus.svg"
                    alt="delete"
                    className="delete-route"
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
                  ></img>
                </div>
              </>
            );
          })}
          <br />
          <div className="addArea">
            <img
              src="./static/plus.svg"
              className="addBtn icon"
              onClick={(e) => clickAdd(e)}
            ></img>
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
          <img
            src="./static/close.svg"
            className="cancelImg icon"
            onClick={(e) => closeModal(e)}
            alt="close"
          ></img>
        </div>
        <form className="form_img">
          <input
            type="file"
            onChange={(e) => {
              setUpdatedImg(e.target.files[0]);
            }}
            className="update_file"
          />
          <br />
          <br></br>
          <div className="submitCancel">
            <input
              type="submit"
              className="popUpSubmit"
              value="Update"
              onClick={(e) => updateImg(e)}
            />
          </div>
        </form>
      </dialog>

      <dialog className="delete-bus">
        <form className="form_delete">
          <h2>Are you sure you want to delete this bus?</h2>
          <div className="deleteImgArea">
            <button className="deleteImgBtn" onClick={(e) => deleteBus(e)}>
              Yes,Delete
            </button>
            <button
              className="deleteImgBtn"
              onClick={(e) => closeModalDeleteBus(e)}
            >
              cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default viewMore;
