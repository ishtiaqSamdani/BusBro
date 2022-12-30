import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig";

const viewMore = (props) => {
    const dataToPush = {
        busNumber: "",
        busPlateNumber: "",
        driver: ["", "", ""],
        GSMMobile: "",
        route: ["", "", ""],
    };
    const inpTemp = {
        busNumber: true,
        busPlateNumber: true,
        driver: [true, true, true],
        GSMMobile: true,
        route: [true, true, true],
    };
    const [busData, setBusData] = useState(dataToPush);
    const [inpChecker, setInpChecker] = useState(inpTemp);
    const [data, setData] = useState(null);
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
        }
    }, [data]);
    // console.log(busData);
    const openDialog = () => {
        document.querySelector(".dialog").showModal();
    };
    const closeDialog = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").close();
    };
    const handlesubmit = (e) => {
        e.preventDefault();

        updateFields();
        closeDialog(e);
    };

    const updateFields = () => {
        let fieldToEdit = doc(database, "buses", singleBus.id);
        let search = busData.busNumber+",";
        busData.route.map((item, index) => {
            if (item !== "") {
                search += (item+",");
            }
        })
        updateDoc(fieldToEdit, {...busData,search:search})
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



    const databaseRef = collection(database, "buses");

    const getData = async () => {
        await getDocs(databaseRef).then((response) => {
            setData(
                response.docs.map((data) => {
                    return { ...data.data(), id: data.id };
                })
            );
        });
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h4>View More</h4>
            <br></br>

            <div style={{ margin: "2rem" }}>
                <h1>{singleBus?.busNumber}</h1>
                <h3>{singleBus?.GSMMobile}</h3>
                <h3>{singleBus?.busPlateNumber}</h3>

                <br></br>
                <h3>{singleBus?.driver[0]}</h3>
                <h3>{singleBus?.driver[1]}</h3>

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
                                    type="text"
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
                                        setInpChecker({
                                            ...inpChecker, driver: [
                                                inpChecker.driver[0],
                                                false,
                                                inpChecker.driver[2],
                                            ],
                                        });
                                    }}
                                    value={
                                        inpChecker.driver[1]
                                            ? singleBus?.driver[1]
                                            : busData.driver[1]
                                    }
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
                                        setInpChecker({
                                            ...inpChecker, driver: [
                                                false,
                                                inpChecker.driver[1],
                                                inpChecker.driver[2],
                                            ],
                                        });
                                    }}
                                    value={
                                        inpChecker.driver[0]
                                            ? singleBus?.driver[0]
                                            : busData.driver[0]
                                    }
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
                                        setInpChecker({
                                            ...inpChecker, driver: [
                                                inpChecker.driver[0],
                                                inpChecker.driver[1],
                                                false,
                                            ],
                                        });
                                    }}
                                    value={
                                        inpChecker.driver[2]
                                            ? singleBus?.driver[2]
                                            : busData.driver[2]
                                    }
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
                                />
                            </label>
                            <h2>Route</h2>
                            <label>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setBusData({
                                            ...busData,
                                            route: [
                                                e.target.value,
                                                busData.route[1],
                                                busData.route[2],
                                            ],
                                        });
                                        setInpChecker({
                                            ...inpChecker, route: [
                                                false,
                                                inpChecker.route[1],
                                                inpChecker.route[2],
                                            ],
                                        });
                                    }}
                                    value={
                                        inpChecker.route[0]
                                            ? singleBus?.route[0]
                                            : busData.route[0]
                                    }
                                ></input>
                                <br></br>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setBusData({
                                            ...busData,
                                            route: [
                                                busData.route[0],
                                                e.target.value,
                                                busData.route[2],
                                            ],
                                        });
                                        setInpChecker({
                                            ...inpChecker, route: [
                                                inpChecker.route[0],
                                                false,
                                                inpChecker.route[2],
                                            ],
                                        });
                                    }}
                                    value={
                                        inpChecker.route[1]
                                            ? singleBus?.route[1]
                                            : busData.route[1]
                                    }
                                ></input>
                                <br></br>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setBusData({
                                            ...busData,
                                            route: [
                                                busData.route[0],
                                                busData.route[1],
                                                e.target.value,
                                            ],
                                        });
                                        setInpChecker({
                                            ...inpChecker, route: [
                                                inpChecker.route[0],
                                                inpChecker.route[1],
                                                false,
                                            ],
                                        });
                                    }}
                                    value={
                                        inpChecker.route[2]
                                            ? singleBus?.route[2]
                                            : busData.route[2]
                                    }
                                ></input>
                                <br></br>
                            </label>
                            <br></br>

                            <input type="submit"></input>

                            <button onClick={(e) => closeDialog(e)}>cancel</button>
                        </form>
                    </dialog>
                </>
            )}
        </>
    );
};

export default viewMore;
