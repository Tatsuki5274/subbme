import { FirebaseDocumentDataType } from "libs/Types";
import { NullablePartial } from "libs/Util";

type ReportServiceBase = {
    id: string
    userID: string
    resultComment: string
    score: number
}

export type ReportService = NullablePartial<ReportServiceBase>

export const buildReportService = (id: string, data: FirebaseDocumentDataType) => {
    const user: ReportService = {
        id,
        ...data
    }
  
    return user
}