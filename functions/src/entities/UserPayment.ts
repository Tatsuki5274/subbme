// import firebase from "libs/Firebase"
import { NullablePartial } from "libs/Util"

type UserPaymentBase = {
    id: string,
    name: string,
    token: string,

    createdAt: FirebaseFirestore.Timestamp
    updatedAt: FirebaseFirestore.Timestamp
}

export type UserPayment = NullablePartial<UserPaymentBase>;

export const buildUserPayment = (id: string, data: FirebaseFirestore.Timestamp) => {
    const user: UserPayment = {
        id,
        ...data
    }
  
    return user
}