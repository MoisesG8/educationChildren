import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfFJB8U98-tIZRi3ucvjSjLYpapmQgI4c",
    authDomain: "educationchildren-6b427.firebaseapp.com",
    projectId: "educationchildren-6b427",
    storageBucket: "educationchildren-6b427.appspot.com",
    messagingSenderId: "956941882969",
    appId: "1:956941882969:web:7623ec04e822ce1ed68348"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
