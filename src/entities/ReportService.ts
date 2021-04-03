import { FirebaseDocumentDataType } from "libs/Types";
import { NullablePartial } from "libs/Util";

export const ReportServiceRankEnum = {
    A: "A",
    B: "B",
    C: "C",
} as const;
export type ReportServiceRankType = typeof ReportServiceRankEnum[keyof typeof ReportServiceRankEnum]

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