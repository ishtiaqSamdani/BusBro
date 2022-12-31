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
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                props.setAdmin(response.user);
                window.localStorage.setItem('busbro-token', response.user.uid);
            })
            .catch(err => {
                alert("Not A Valid User")
            })

        router.push('/');
    }
    return (
        <>
            <form className="cont" onSubmit={(e) => signIn(e)}>
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
                <input type="submit" value="submit"/>
            </form>
        </>
    )
}

export default Login
