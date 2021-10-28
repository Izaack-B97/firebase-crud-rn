import { LogBox } from 'react-native';

import { firebase } from '@firebase/app';
import '@firebase/firestore';
import "@firebase/auth";

// Optionally import the services that you want to use
//import {...} from "firebase/database";
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
if ( !firebase.apps.length ) {
    firebase.initializeApp( firebaseConfig );
} else {
    firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();


LogBox.ignoreLogs(['Setting a timer', 'Non-serializable values were found in the navigation state',]);

export default {
    firebase,
    db,
    auth
}