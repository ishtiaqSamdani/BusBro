import { useRouter } from 'next/router'
import React from 'react'

const Navbar = () => {
    const router = useRouter()
    return (
        <nav className="navbar" style={{ 'backgroundColor': 'rebeccapurple', 'width': '100%', 'padding': '2rem' }}>
            <button className="btn"
                onClick={() => { router.push('/login') }}
            >LOGIN</button>
        </nav>
    )
}

export default Navbar
