import { useState } from 'react';
import Navbar from '../components/navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [admin, setAdmin] = useState(null);
  return <>
    <Navbar admin={admin} setAdmin={setAdmin} />
    <Component {...pageProps} admin={admin} setAdmin={setAdmin} />
  </>
}

export default MyApp
