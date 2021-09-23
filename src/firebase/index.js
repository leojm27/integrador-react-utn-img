import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoaJ4sTGyHKuxCJXxjWFNrkkzo6MA-aTY",
    authDomain: "tp-react-utn-2021.firebaseapp.com",
    projectId: "tp-react-utn-2021",
    storageBucket: "tp-react-utn-2021.appspot.com",
    messagingSenderId: "1081071836864",
    appId: "1:1081071836864:web:3e8901e99a19e6c092d725",
    measurementId: "G-1ZR5GPV415"
};


firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
