import firebase from "libs/Firebase"
import { NullablePartial } from "libs/Util";

export const ServiceUnitEnum = {
    Year: "YEAR",
    Month: "MONTH",
    Day: "DAY",
} as const;

export type ServiceUnitType = typeof ServiceUnitEnum[keyof typeof ServiceUnitEnum]

type ServiceBase = {
    id: string
    userID: string
    serviceName: string
    planName: string
    categoryID: string
    detail: string
    // categoryName: string
    unit: ServiceUnitType
    // costPerUnitTerm: number
    costPerDay: number
    unitTerm: number
    currency: string
    paymentMethod: string
    isArchived: boolean
    createdAt: firebase.firestore.Timestamp
    updatedAt: firebase.firestore.Timestamp
}

export type Service = NullablePartial<ServiceBase>

export const buildService = (id: string, data: firebase.firestore.DocumentData) => {
    const user: Service = {
        id,
        ...data
    }
  
    return user
}