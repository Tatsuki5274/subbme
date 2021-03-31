// // Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase/app";
// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage"
// import "firebase/functions"


// // Your web app's Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyCQq-x5TxBBT4Fr4c3DvvhpOgEe4wY6rPM",
//     authDomain: "subbme-dev.firebaseapp.com",
//     projectId: "subbme-dev",
//     storageBucket: "subbme-dev.appspot.com",
//     messagingSenderId: "729779483858",
//     appId: "1:729779483858:web:19d88c3099ba968e3ae90b"
// };



// if (firebase.apps.length === 0) {
//     firebase.initializeApp(firebaseConfig);
//     const isEmulating = window.location.hostname === "localhost";
//     if (isEmulating) {
//         console.log("Emulating mode")
//         firebase.auth().useEmulator("http://localhost:9099");
//         firebase.functions().useEmulator("localhost", 5001);
//         firebase.firestore().useEmulator("localhost", 8081);
//     }
// }

import * as admin from 'firebase-admin';

if(!admin.apps.length){
    admin.initializeApp();
}

export default admin;