import { FirebaseDocumentDataType } from "libs/Types";
import { NullablePartial } from "libs/Util";

type ReportServiceBase = {
    id: string
    rank: "A" | "B" | "C"
    // serviceRef: 
    rate: number
    serviceName: string
    costPerDay: number
    categoryID: string
}

export type ReportService = NullablePartial<ReportServiceBase>

export const buildReportService = (id: string, data: FirebaseDocumentDataType) => {
    const user: ReportService = {
        id,
        ...data
    }
  
    return user
}