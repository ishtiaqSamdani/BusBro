import Link from 'next/link'
import React, { useState } from 'react'
import Router from 'next/router'

const Bus = (props) => {
    const [bus, setbus] = useState(props.bus);
    const pushData = () => {
        Router.push(
            {
                pathname : '/view-more',
                query : {
                    busNumber : bus.busNumber,
                    admin : props.admin
                }
            }
        )
    }
    return (
        <>
            <div style={{ "backgroundColor": "hotpink", 'color': '#333', 'width': '50vw', "margin": '3rem' }}>
                <h1 className="bus_number">
                    {bus.busNumber}
                </h1>

                {
                    bus.route.map((item, index) => {
                        return (
                            <div key={index} className="bus_route">
                                <h3>
                                    {item} {"- >"}
                                </h3>
                            </div>
                        )
                    })
                }

                <button>
                    <a onClick={()=>{pushData()}}>view more...</a>
                        
                    
                </button>


            </div>


        </>
    )
}

export default Bus

