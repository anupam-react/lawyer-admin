// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3vVrAtxoOWAKr_4wbRgltyKnmG2lOw8Y",
  authDomain: "shlok-messenger.firebaseapp.com",
  projectId: "shlok-messenger",
  storageBucket: "shlok-messenger.appspot.com",
  messagingSenderId: "1075568859600",
  appId: "1:1075568859600:web:3f702d74a4472c18c581d5",
  measurementId: "G-81JL1221F8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
