// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCMJx6UDoV6dqKMwuUKKGT-WO71hCJ9ids",
  authDomain: "blog-app-97000.firebaseapp.com",
  projectId: "blog-app-97000",
  storageBucket: "blog-app-97000.firebasestorage.app",
  messagingSenderId: "1077030453372",
  appId: "1:1077030453372:web:ab9f19928951b3e97dc9f9",
  measurementId: "G-BMVZLB9QF7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
