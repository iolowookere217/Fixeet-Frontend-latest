// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSMoC8Gd4WvaOyPYFPWcCDCWSfW3acGxg",
  authDomain: "fixeet-91fac.firebaseapp.com",
  projectId: "fixeet-91fac",
  storageBucket: "fixeet-91fac.appspot.com",
  messagingSenderId: "673829815379",
  appId: "1:673829815379:web:61abe5c308f22be1baf2a6",
  measurementId: "G-0C9FE6D3HN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
