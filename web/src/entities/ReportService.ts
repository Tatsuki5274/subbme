import { FirebaseDocumentDataType } from "../libs/Types";
import { NullablePartial } from "../libs/Util";

export const ReportServiceRankEnum = {
  A: "A",
  B: "B",
  C: "C",
} as const;
export type ReportServiceRankType = typeof ReportServiceRankEnum[keyof typeof ReportServiceRankEnum];

export const ReportServiceAdviceStatusEnum = {
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  DANGER: "DANGER",
} as const;
export type ReportServiceAdviceStatusType = typeof ReportServiceAdviceStatusEnum[keyof typeof ReportServiceAdviceStatusEnum];

type ReportServiceBase = {
  id: string;
  rank: ReportServiceRankType;
  // serviceRef:
  rate: number;
  serviceName: string;
  costPerDay: number;
  categoryName: string[];
  advice: {
    comment?: string;
    status?: ReportServiceAdviceStatusType;
  };
};

export type ReportService = NullablePartial<ReportServiceBase>;

export const buildReportService = (
  id: string,
  data: FirebaseDocumentDataType
) => {
  const user: ReportService = {
    id,
    ...data,
  };

  return user;
};

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
