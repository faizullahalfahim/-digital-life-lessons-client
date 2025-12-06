// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPrmizJDHr4gGKyNiIaUeoN-7MwHcQ8HI",
  authDomain: "digital-life-lessons-546ab.firebaseapp.com",
  projectId: "digital-life-lessons-546ab",
  storageBucket: "digital-life-lessons-546ab.firebasestorage.app",
  messagingSenderId: "714390587012",
  appId: "1:714390587012:web:11c23dc4bb7745587fe4d1"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);