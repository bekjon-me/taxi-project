import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/main.scss";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCNxdEjajvnAVsy2Q0VIC3yo2EkL6IR_UA",
  authDomain: "taxi-project-bekjon.firebaseapp.com",
  projectId: "taxi-project-bekjon",
  storageBucket: "taxi-project-bekjon.appspot.com",
  messagingSenderId: "292237657455",
  appId: "1:292237657455:web:61b143854c418c5f4f949a",
  measurementId: "G-EYYRDKD44J",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

ReactDOM.render(
  <Context.Provider value={{ firestore, storage, auth, firebase }}>
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
