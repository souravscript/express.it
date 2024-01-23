// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmSgoy0R2id0qib6DL0jAzlktjESqrzuo",
  authDomain: "tweetx-web.firebaseapp.com",
  projectId: "tweetx-web",
  storageBucket: "tweetx-web.appspot.com",
  messagingSenderId: "860172820315",
  appId: "1:860172820315:web:9eb25aaaa988d2f145847e",
  measurementId: "G-YJX55QZ0QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);
export const auth=getAuth(app);
export const provider= new GoogleAuthProvider();