// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDoAXahn4mOzl6ioNd2HvkPI7RxSYoYA8I",
  authDomain: "hais-72666.firebaseapp.com",
  projectId: "hais-72666",
  storageBucket: "hais-72666.appspot.com",
  messagingSenderId: "679447973074",
  appId: "1:679447973074:web:2d46904d979684a61b710b",
  measurementId: "G-Z1N27PS7D1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
