import firebase from "./Firebase";

// フロントエンド用型定義
export type FirebaseCollectionReferenceType = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
export type FirebaseDocumentReferenceType = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export type FirebaseQueryType = firebase.firestore.Query<firebase.firestore.DocumentData>;
export type FirebaseFirestoreTimestampType = firebase.firestore.Timestamp;
export type FirebaseDocumentDataType = firebase.firestore.DocumentData;

// firebase.auth().languageCode = "ja";

// export const db = firebase.firestore();
// export const auth = firebase.auth();
