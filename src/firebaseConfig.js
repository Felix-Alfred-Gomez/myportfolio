// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkxzNdRYB6qKGYmMelmrpFVWg_siDrLqM",
  authDomain: "myportfolio-b8372.firebaseapp.com",
  databaseURL: "https://myportfolio-b8372-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myportfolio-b8372",
  storageBucket: "myportfolio-b8372.firebasestorage.app",
  messagingSenderId: "998722505016",
  appId: "1:998722505016:web:1b4ecb579ccdfae7c7d9cd",
  measurementId: "G-N1C1NYX4DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };