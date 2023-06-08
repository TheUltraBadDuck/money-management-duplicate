// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj9c_a5ocTtofi54mQ4f44KIVG3-kc75o",
  authDomain: "money-in-your-hand-2da44.firebaseapp.com",
  databaseURL: "https://money-in-your-hand-2da44-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "money-in-your-hand-2da44",
  storageBucket: "money-in-your-hand-2da44.appspot.com",
  messagingSenderId: "783629807424",
  appId: "1:783629807424:web:2078c96b8ede61169254a5",
  measurementId: "G-5R4Z36WXW6"
};

const firebaseApp = initializeApp(firebaseConfig);
console.log("Successfully link to firebase\n")

const auth = getAuth(firebaseApp);
export {auth}

export default firebaseApp

 

