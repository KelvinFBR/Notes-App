// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0bygojRxxDwvizdN2ocXHh4pM6FdkJBs",
  authDomain: "react-notes-app-f781e.firebaseapp.com",
  projectId: "react-notes-app-f781e",
  storageBucket: "react-notes-app-f781e.appspot.com",
  messagingSenderId: "1049588980217",
  appId: "1:1049588980217:web:22a405f1149a85e587c528",
};

export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
