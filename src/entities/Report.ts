import { FirebaseDocumentDataType, FirebaseFirestoreTimestampType } from "libs/Types";
import { NullablePartial } from "libs/Util";

type ReportBase = {
    id: string
    userID: string
    resultComment: string
    score: number
    createdAt: FirebaseFirestoreTimestampType
    updatedAt: FirebaseFirestoreTimestampType
}

export type Report = NullablePartial<ReportBase>

export const buildReport = (id: string, data: FirebaseDocumentDataType) => {
    const user: Report = {
        id,
        ...data
    }
  
    return user
}