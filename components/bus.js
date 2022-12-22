import Link from 'next/link'
import React, { useState } from 'react'

const Bus = (props) => {
    const [bus, setbus] = useState(props.bus)
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
                    <Link href="/view-more">
                        view more {"->"}
                    </Link>
                </button>


            </div>


        </>
    )
}

export default Bus

