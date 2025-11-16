// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyBhVpKqcugriKlEl6jPtuwpLnEoDAZJaVg",
  authDomain: "randd-7f723.firebaseapp.com",
  projectId: "randd-7f723",
  storageBucket: "randd-7f723.firebasestorage.app",
  messagingSenderId: "821274688774",
  appId: "1:821274688774:web:79d07e51f44d01b853b287",
  measurementId: "G-QNZ51E6V72"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
