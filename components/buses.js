import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { app, database } from '../firebaseConfig';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import Bus from '../components/bus';

function Buses({ admin }) {
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

    // const unsub = onSnapshot(doc(database, "buses",), (doc) => {
    //     console.log("Current data: ", doc.data());
    // });
    return (
        <>
            <h2>
                search
            </h2>
            <input type="text" className="search" />



            {
                data ? (
                    data.map((bus) => {
                        return (
                            <Bus bus={bus} admin={admin} />
                        )
                    }
                    )) : (
                    <div class="loader" style={{ "marginTop": "3rem" }}>
                    </div>
                )
            }

        </>
    )
}

export default Buses
