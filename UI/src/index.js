import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyDV5t4Qc2HRSp4JXLlNPnvIGCEKr-CO3Ds",
    authDomain: "qualip-904da.firebaseapp.com",
    databaseURL: "https://qualip-904da-default-rtdb.firebaseio.com",
    projectId: "qualip-904da",
    storageBucket: "qualip-904da.appspot.com",
    messagingSenderId: "165051377075",
    appId: "1:165051377075:web:e4e135f4552669736f17c6",
    measurementId: "G-V2XG6WYTFR"

});

ReactDOM.render(<App />, document.getElementById('root'));
