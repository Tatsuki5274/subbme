import firebase from "libs/Firebase"

type ServiceBase = {
    id: string
    userID: string
    serviceName: string
    planName: string
    categoryID: string
    detail: string
    // categoryName: string
    unit: string
    currency: string
    costPerUnit: number
    paymentMethod: string
    isArchived: boolean
}

export type Service = Partial<ServiceBase>

export const buildService = (id: string, data: firebase.firestore.DocumentData) => {
    const user: Service = {
        id,
        ...data
    }
  
    return user
}