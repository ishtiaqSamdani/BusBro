import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useEffect } from 'react';
import { app } from '../firebaseConfig';
import {
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = (props) => {
    const auth = getAuth();
    const router = useRouter();
    const [d, setd] = useState(null)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                props.setAdmin(response.user);
            })
            .catch(err => {
                alert("Not A Valid User")
            })

        router.push('/');
    }
    return (
        <>
            <div className="cont">
                <input
                    type="text"
                    name=""
                    id=""
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    name=""
                    id=""
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input type="submit" value="submit" onClick={() => signIn()} />
            </div>
        </>
    )
}

export default Login
