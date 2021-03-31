import firebase from "libs/Firebase"
import { FirebaseDocumentDataType, FirebaseFirestoreTimestampType } from "libs/Types";
import { NullablePartial } from "libs/Util"

type UserPaymentBase = {
    id: string,
    name: string,
    token: string,

    createdAt: FirebaseFirestoreTimestampType
    updatedAt: FirebaseFirestoreTimestampType
}

export type UserPayment = NullablePartial<UserPaymentBase>;

export const buildUserPayment = (id: string, data: FirebaseDocumentDataType) => {
    const user: UserPayment = {
        id,
        ...data
    }
  
    return user
}