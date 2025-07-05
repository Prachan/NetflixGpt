// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfbC89_d2bplIVMJMtchFLi5Idfh7y0Yc",
  authDomain: "netflixgpt-3a9fc.firebaseapp.com",
  projectId: "netflixgpt-3a9fc",
  storageBucket: "netflixgpt-3a9fc.firebasestorage.app",
  messagingSenderId: "515859388175",
  appId: "1:515859388175:web:5388624a46605e6bb1107a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();