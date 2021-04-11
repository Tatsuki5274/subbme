// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import * as dotenv from "dotenv";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

dotenv.config();

const isEmulating = process.env.REACT_APP_FIREBASE_EMULATOR;

const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);

  if (isEmulating === "true") {
    // エミュレーターでの動作の場合
    // eslint-disable-next-line no-console
    console.log("Emulating mode");
    firebase.auth().useEmulator("http://localhost:9099");
    firebase.functions().useEmulator("localhost", 5001);
    firebase.firestore().useEmulator("localhost", 8081);
  }
}

export default firebase;
