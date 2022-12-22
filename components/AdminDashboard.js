import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { database } from '../firebaseConfig';
import Buses from './buses';

const AdminDashboard = ({ admin }) => {
    let cnt = 0;
    const dataToPush = {
        busNumber: "",
        busPlateNumber: "",
        driver: ["", "", ""],
        GSMMobile: "",
        route: [""],
    }
    const [busData, setBusData] = useState(dataToPush);
    const [routes, setRoutes] = useState([{ name: '' }]);
    const databaseRef = collection(database, 'buses');
    const openDialog = () => {
        document.querySelector('.dialog').showModal();
    }
    const closeDialog = () => {
        document.querySelector('.dialog').close();
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        addData();
        closeDialog();
    }


    const addData = () => {
        addDoc(databaseRef, busData)
            .then(() => {
                alert('Data Sent')
                // getData()
                // setName('')
                // setAge(null)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        console.log(busData)
    }, [busData])





    return (
        <>
            <h1>Admin</h1>
            <button onClick={() => {
                auth.signOut();
                props.setAdmin(null);
            }}>Sign Out</button>


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
                            onChange={(e) => { setBusData({ ...busData, busNumber: e.target.value }) }}
                            value={busData.busNumber}
                        />
                    </label>
                    <br />
                    <label>Bus Plate Number

                        <input
                            type="text"
                            name="bus_plate_number"
                            onChange={(e) => { setBusData({ ...busData, busPlateNumber: e.target.value }) }}
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
                            onChange={(e) => { setBusData({ ...busData, driver: [busData.driver[0], e.target.value, busData.driver[2]] }) }}
                            value={busData.driver[1]}
                        />
                    </label>
                    <br />



                    <br />
                    <label>
                        Driver Name:
                        <input
                            type="text"
                            name="Name_number"
                            onChange={(e) => { setBusData({ ...busData, driver: [e.target.value, busData.driver[1], busData.driver[2]] }) }}
                            value={busData.driver[0]}
                        />
                    </label>
                    <br />
                    <label>
                        Driver photo:
                        <input
                            type="file"
                            name={"1"}
                            onChange={(e) => { setBusData({ ...busData, driver: [busData.driver[0], busData.driver[1], e.target.value] }) }}
                            value={busData.driver[2]}
                        />
                    </label>
                    <br />
                    <label>GSM mobile

                        <input
                            type="text"
                            name="gsm_mobile_number"
                            onChange={(e) => { setBusData({ ...busData, GSMMobile: e.target.value }) }}
                            value={busData.GSMMobile}
                        />

                    </label>
                    <h2>Route</h2>
                    {
                        routes.map((val, idx) => {
                            return (
                                <>

                                    <label>
                                        {idx}:
                                        <input
                                            type="text"
                                            name=""
                                            onChange={(e) => { setBusData({ ...busData, route: [...busData.route, e.target.value] }) }}
                                        // value={busData.route[idx]}
                                        />
                                    </label>
                                    <br />
                                    <button>
                                        +
                                    </button>
                                    <br />
                                </>
                            )
                        })




                    }


                    <input type='submit'>
                    </input>

                    <button onClick={closeDialog}>cancel</button>

                </form>

            </dialog>


        </>
    )
}

export default AdminDashboard
