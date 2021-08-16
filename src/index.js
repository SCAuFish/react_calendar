import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';
import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDU8rsu5nNka6vyZdxqKSMXD-fOn4sOwkU",
    authDomain: "react-calendar-2021.firebaseapp.com",
    projectId: "react-calendar-2021",
    storageBucket: "react-calendar-2021.appspot.com",
    messagingSenderId: "405500985842",
    appId: "1:405500985842:web:c02edeaccf99f3526a6b6b",
    measurementId: "G-G2WMGYSXZH"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
    </FirebaseAppProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
