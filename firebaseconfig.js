// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAJbpUB1estVM2hlULyeCaBiszxJ6bEHSY",
    authDomain: "bus-bro.firebaseapp.com",
    projectId: "bus-bro",
    storageBucket: "bus-bro.appspot.com",
    messagingSenderId: "757375049807",
    appId: "1:757375049807:web:33af6344aa74f033044a3a",
    measurementId: "G-9TBF74DW6H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
// const analytics = getAnalytics(app);