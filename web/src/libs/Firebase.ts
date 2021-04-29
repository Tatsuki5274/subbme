// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "gatsby-plugin-firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
// import "firebase/functions";

let db: firebase.firestore.Firestore | null = null;

if (typeof window !== "undefined") {
  require("firebase/functions");
  require("firebase/auth");
  require("firebase/storage");
  require("firebase/firestore");
  db = firebase.firestore();
  const isEmulating = process.env.GATSBY_FIREBASE_EMULATOR;

  if (isEmulating) {
    firebase.functions().useEmulator("localhost", 5001);
  }
}

export { db };
export default firebase;
