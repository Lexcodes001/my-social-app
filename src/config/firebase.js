import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHWomj5ybumt5G9AEg84syjK39HjWyTl8",
  authDomain: "my-social-app-780bf.firebaseapp.com",
  projectId: "my-social-app-780bf",
  storageBucket: "my-social-app-780bf.appspot.com",
  messagingSenderId: "444814761786",
  appId: "1:444814761786:web:61613f8188cacfb10cfa03",
  measurementId: "G-NBNDLVW49S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();
