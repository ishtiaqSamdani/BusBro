import { getAuth } from 'firebase/auth';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { app } from '../firebaseConfig';
import Buses from '../components/buses';
import AdminDashboard from '../components/AdminDashboard';

export default function Home(props) {
  const auth = getAuth();

  return (
    <>
      {
        (props.admin) ? (
          <>
            <AdminDashboard admin={props.admin} />
          </>

        ) : (
          <Buses />)

      }

    </>
  );
}
