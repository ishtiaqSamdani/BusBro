import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { database } from '../firebaseConfig';

const viewMore = (props) => {

  const dataToPush = {
    busNumber: "",
    busPlateNumber: "",
    driver: ["", "", ""],
    GSMMobile: "",
    route: ["", "", ""],
}
const [busData, setBusData] = useState(dataToPush);
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

  const databaseRef = collection(database, 'buses');
    const [data, setData] = useState(null)
    const getData = async () => {
        await getDocs(databaseRef)
            .then((response) => {
                setData(response.docs.map((data) => {
                    return { ...data.data(), id: data.id }
                }))

            })
    }
    useEffect(() => {
        getData();
    }, [])

    const router = useRouter();
    const busNumber = router.query.busNumber;
     const singleBus = data ? (data.find((bus)=>{ return  bus.busNumber == busNumber})):null;
    console.log(busData);

  return (
    <>
        <h4>View More</h4>
        <br></br>

        <div style={{margin: '2rem'}}>
        <h1>{singleBus?.busNumber}</h1>
        <h3>{singleBus?.GSMMobile}</h3>
        <h3>{singleBus?.busPlateNumber}</h3>


        <br></br>
        <h3>{singleBus?.driver[0]}</h3>
        <h3>{singleBus?.driver[1]}</h3>

        {singleBus?.route.map((rt)=>{
          return(
            <li>{rt}</li>
          )
        })}
        </div>

        {
          (props.admin)&& (
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
                <label>
                    <input type="text"
                        onChange={(e) => { setBusData({ ...busData, route: [e.target.value, busData.route[1], busData.route[2]] }) }}
                        value={busData.route[0]}
                    ></input>
                    <br></br>
                    <input type="text"
                        onChange={(e) => { setBusData({ ...busData, route: [busData.route[0],e.target.value, busData.route[2]] }) }}
                        value={busData.route[1]} ></input>
                    <br></br>
                    <input type="text"
                        onChange={(e) => { setBusData({ ...busData, route: [ busData.route[0], busData.route[1],e.target.value] }) }}
                        value={busData.route[2]}  ></input>
                    <br></br>
                </label>
                <br></br>







                <input type='submit'>
                </input>

                <button onClick={closeDialog}>cancel</button>

            </form>

        </dialog>
        
</>
            
          )
          
        }
        
    </>
    
  )
}

export default viewMore