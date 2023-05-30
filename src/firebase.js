//import firebase from 'firebase';
// import firebase from 'firebase/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/database';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASgrbRAVhL5Z4UYnSQgiUkjLKNzjBURv0",
  authDomain: "clone-c3f06.firebaseapp.com",
  projectId: "clone-c3f06",
  storageBucket: "clone-c3f06.appspot.com",
  messagingSenderId: "556114085530",
  appId: "1:556114085530:web:65a97bea0d318495d10123",
  measurementId: "G-ZZ4ZNCLNQX"
}; 

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db,auth};