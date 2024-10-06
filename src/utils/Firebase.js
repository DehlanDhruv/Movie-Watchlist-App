// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg8aSkLjj4pgApM7mMMKfCgwvxVCL9Sxw",
  authDomain: "moviewatchlistapp-e7033.firebaseapp.com",
  projectId: "moviewatchlistapp-e7033",
  storageBucket: "moviewatchlistapp-e7033.appspot.com",
  messagingSenderId: "826895734076",
  appId: "1:826895734076:web:eb015cc2cb64d8655e3a39",
  measurementId: "G-3H185W8H7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();