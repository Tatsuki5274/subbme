import firebase from "libs/Firebase"
import { NullablePartial } from "libs/Util"

type UserBase = {
    uid: string
    lastLoginDate: firebase.firestore.Timestamp
    currency: "JPY",
    lastCreateReportDate: firebase.firestore.Timestamp
// isSendReportEmail
    createdAt: firebase.firestore.Timestamp
    updatedAt: firebase.firestore.Timestamp
}

export type User = NullablePartial<UserBase>;

export const buildUser = (uid: string, data: firebase.firestore.DocumentData) => {
    const user: User = {
        uid,
        ...data
    }
  
    return user
}