// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "jhkim-c8b86.firebaseapp.com",
  projectId: "jhkim-c8b86",
  storageBucket: "jhkim-c8b86.appspot.com",
  messagingSenderId: "897172730213",
  appId: "1:897172730213:web:90f656ebe04149a847318c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
