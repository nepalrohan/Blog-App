// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-cdecd.firebaseapp.com",
  projectId: "mern-blog-cdecd",
  storageBucket: "mern-blog-cdecd.appspot.com",
  messagingSenderId: "165517666567",
  appId: "1:165517666567:web:403bf3cef3247aa8343da2",
  measurementId: "G-9WTJ6ZL2GV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);