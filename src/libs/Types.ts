import firebase from "libs/Firebase"

// フロントエンド用型定義
export type FirebaseReferenceType = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
export type FirebaseQueryType = firebase.firestore.Query<firebase.firestore.DocumentData>;
export type FirebaseFirestoreTimestampType = firebase.firestore.Timestamp;
export type FirebaseDocumentDataType = firebase.firestore.DocumentData;

export const db = firebase.firestore();