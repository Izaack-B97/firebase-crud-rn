const firebase = require('@firebase/app');

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyCNz5CEdSaUlF_stNd4Ton_z2Kx4qI6l34",
    authDomain: "react-native-firebase-486b3.firebaseapp.com",
    projectId: "react-native-firebase-486b3",
    storageBucket: "react-native-firebase-486b3.appspot.com",
    messagingSenderId: "588425589202",
    appId: "1:588425589202:web:42bb77553cd6bf809bd80b"
};



// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);


export default {
    firebaseConfig
}