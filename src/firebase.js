// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(`VITE_FIREBASE_API_KEY: ${import.meta.env.VITE_FIREBASE_API_KEY}`);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "execuses-laba.firebaseapp.com",
  projectId: "execuses-laba",
  storageBucket: "execuses-laba.firebasestorage.app",
  messagingSenderId: "412819735994",
  appId: "1:412819735994:web:46b1d2da428193c9c20983",
  measurementId: "G-QZ59474V57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, storage, db, auth, googleProvider };