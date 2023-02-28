import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { app, database } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Bus from "../components/bus";
import Image from "next/image";
import background from "./assets/background-buses.jpg";

function Buses({ admin }) {
  const databaseRef = collection(database, "buses");
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [examcheck, setExamcheck] = useState(false);
  const [tableCheck, setTableCheck] = useState(false);

  // onsnapshot
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

  // useEffect(() => {

  //   if (examcheck) {
  //     filteredItems = filteredItems.filter((item) => {
  //       return item.exam == "yes";
  //     })
  //   }
  // }, [examcheck]);

  const handleExamFilter = (e) => {
    setExamcheck(!examcheck)
  }

  const handleTableFilter = (e) => {
    setTableCheck(!tableCheck)

    console.log(tableCheck);
  }

  const filteredItems = useMemo(() => {
    return data?.filter((item) => {
      return item.search?.toLowerCase().includes(query.toLowerCase());
    });
  }, [data, query]);
  return (
    <>
      <div className="minHeight">
        <div className="landing__page">
          <Image className="landing__page--img" src={background} />
          <div className="search__container">
            <img src="./static/search.svg" alt="search-icon" className="search__img" />
            <input
              type="search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              className="search"
              placeholder="Destination or Bus Number"
            />
          </div>
        </div>
        <h1>{examcheck}</h1>
        <div className="checkboxFlex">

          <label className="checkbx">

          <input className="examStyle" type="checkbox" checked={examcheck} id="examFilter" onChange={(e) => { handleExamFilter(e) }}></input> <span className="filterTexts">Exam</span>

          </label>
          <label className="tableStyle checkbx">

          <input className="examStyle " type="checkbox" checked={tableCheck} id="table" onChange={(e) => { handleTableFilter(e) }}></input> <span className="filterTexts">Table</span>

          </label>

        </div>

        {
          tableCheck ?
            (
              <div class="table_container">
                <table >
                  <thead className="tableHeadBackground">
                    <tr>
                      <th className="tableText">Bus Number</th>
                      <th className="tableText">Route</th>
                      <th className="tableText">Driver Name</th>
                      <th className="tableText">Driver Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      examcheck ? (
                        <>
                          {
                            filteredItems.filter((item) => {
                              return item.exam === "yes";
                            }).map((bus) => {
                              return (
                                <>
                                  <tr>
                                    <td className="tableText">{bus.busNumber}</td>
                                    <td className="tableText">
                                      {bus.route.map((rt) => {
                                        return (<>{rt} {" ,"} </>)

                                      }
                                      )}
                                    </td>
                                    <td className="tableText">{bus.driver[0]}</td>
                                    <td className="tableText">{bus.driver[1]}</td>
                                  </tr>


                                </>
                              )//<Bus bus={bus} admin={admin} istable={tableCheck} />;
                            }
                            )
                          }
                        </>
                      ) : (
                        <>
                          {
                            filteredItems.map((bus) => {
                              return (
                                <>
                                  <tr>
                                    <td className="tableText">{bus.busNumber}</td>
                                    <td className="tableText">
                                      {bus.route.map((rt) => {
                                        return (
                                          
                                            <>
                                            {
                                              rt?(<span class= "table_span" >
                                                <span class="table_data">{rt}</span>
                                                <span class="separator">{" ,"}</span>
                                                </span>):<></>

                                            }
                                            </>

                                          
                                    )
                                  
                                }
                                )}
                                  </td>
                                  <td className="tableText">{bus.driver[0]}</td>
                                  <td className="tableText">{bus.driver[1]}</td>
                                </tr>
                              
                              
                              </>
                      )
                    })
                          }
                  </>
                  )


                    }
                </tbody>
              </table>
              </div>

      ) :
      (
      <>
        {filteredItems ? (
          <div className="grid">

            {
              examcheck ? (
                <>
                  {
                    filteredItems.filter((item) => {
                      return item.exam === "yes";
                    }).map((bus) => {
                      return <Bus bus={bus} admin={admin} istable={tableCheck} />;
                    })
                  }
                </>
              ) : (
                <>
                  {
                    filteredItems.map((bus) => {
                      return <Bus bus={bus} admin={admin} istable={tableCheck} />;
                    })
                  }
                </>
              )


            }

          </div>
        ) : (
          // <div className="loader" style={{ marginTop: "3rem",marginBottom:"100vh" }}></div>
          <img className="loader-bus" src="https://cdn.dribbble.com/users/13629280/screenshots/19734211/media/297ce93165b798b9d40c724a0e01d611.gif" alt="" srcset="" />

        )}

      </>
      )
        }


    </div>

    </>
  );
}

export default Buses;
