import firebase from "libs/Firebase"
import { NullablePartial } from "libs/Util"

type UserPaymentBase = {
    id: string,
    name: string,
    token: string,

    createdAt: firebase.firestore.Timestamp
    updatedAt: firebase.firestore.Timestamp
}

export type UserPayment = NullablePartial<UserPaymentBase>;

export const buildUserPayment = (id: string, data: firebase.firestore.DocumentData) => {
    const user: UserPayment = {
        id,
        ...data
    }
  
    return user
}