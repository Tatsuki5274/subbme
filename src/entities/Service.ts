import firebase from "libs/Firebase"
import { NullablePartial } from "libs/Util";

export const ServiceUnitEnum = {
    Month: "MONTH",
    Day: "DAY",
    Year: "YEAR",
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
    costPerUnitTerm: string
    unitTerm: number
    currency: string
    paymentMethod: string
    isArchived: boolean
}

export type Service = NullablePartial<ServiceBase>

export const buildService = (id: string, data: firebase.firestore.DocumentData) => {
    const user: Service = {
        id,
        ...data
    }
  
    return user
}