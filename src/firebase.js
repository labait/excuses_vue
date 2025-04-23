// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6Nuh_QJ4hsBSAnZGsnFviie3ykbl_FWM",
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

export { app };