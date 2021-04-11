/* eslint-disable valid-jsdoc */

import {FirebaseDocumentDataType} from "../libs/Types";
import {NullablePartial} from "../libs/Util";

export const ReportServiceRankEnum = {
  A: "A",
  B: "B",
  C: "C",
} as const;
export type ReportServiceRankType =
  typeof ReportServiceRankEnum[keyof typeof ReportServiceRankEnum];

type ReportServiceBase = {
    id: string
    rank: ReportServiceRankType
    // serviceRef:
    rate: number
    serviceName: string
    costPerDay: number
    categoryName: string[]
}

export type ReportService = NullablePartial<ReportServiceBase>

export const buildReportService =
  (id: string, data: FirebaseDocumentDataType) => {
    const user: ReportService = {
      id,
      ...data,
    };

    return user;
  };

/**
 *
 * @param num ランク番号
 * @return ランク文字列
 */
export function convertRank(num: number): string | null {
  let resutl: string | null = null;
  switch (num) {
    case 0:
      resutl = "A";
      break;
    case 1:
      resutl = "B";
      break;
    case 2:
      resutl = "C";
      break;
  }
  return resutl;
}
