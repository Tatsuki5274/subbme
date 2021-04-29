import {
  FirebaseDocumentDataType,
  FirebaseFirestoreTimestampType,
} from "../libs/Types";
import { NullablePartial } from "../libs/Util";

type ReportBase = {
  id: string;
  userID: string;
  resultComment: string;
  score: number;
  totalCostPerDay: number;
  advice: {
    comment?: string;
    actionLink?: string;
  };
  createdAt: FirebaseFirestoreTimestampType;
  updatedAt: FirebaseFirestoreTimestampType;
};

export type Report = NullablePartial<ReportBase>;
