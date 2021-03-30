// import firebase from "libs/Firebase"
import { NullablePartial } from "libs/Util"

type UserBase = {
    uid: string
    lastLoginDate: FirebaseFirestore.Timestamp
    currency: "JPY",
    lastCreateReportDate: FirebaseFirestore.Timestamp
// isSendReportEmail
    createdAt: FirebaseFirestore.Timestamp
    updatedAt: FirebaseFirestore.Timestamp
}
export type User = NullablePartial<UserBase>;

export const buildUser = (uid: string, data: FirebaseFirestore.DocumentData | undefined) => {
    const user: User = {
        uid,
        ...data
    }
  
    return user
}