import admin from "./Firebase"

// フロントエンド用型定義
export type FirebaseReferenceType = FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
export type FirebaseQueryType = FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
export type FirebaseFirestoreTimestampType = FirebaseFirestore.Timestamp;
export type FirebaseDocumentDataType = FirebaseFirestore.DocumentData;

export const db = admin.firestore();