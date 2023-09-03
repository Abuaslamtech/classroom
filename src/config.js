// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxsNsORV-XobwKT_c2O6KDYjR_gjZgc2E",
  authDomain: "classroom-136bb.firebaseapp.com",
  projectId: "classroom-136bb",
  storageBucket: "classroom-136bb.appspot.com",
  messagingSenderId: "43200956988",
  appId: "1:43200956988:web:5324bc817a1f49db865139",
  measurementId: "G-83Q0F2W1FS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app)

export  {app, storage, firestore};
