import { FirebaseFirestoreTimestampType } from "../libs/Types";
import { NullablePartial } from "../libs/Util";

type UserBase = {
  id: string;
  lastLoginDate: FirebaseFirestoreTimestampType;
  currency: "JPY";
  LastReportCreatedAt: FirebaseFirestoreTimestampType;
  email: string;
  // isSendReportEmail
  createdAt: FirebaseFirestoreTimestampType;
  updatedAt: FirebaseFirestoreTimestampType;
};

export type User = NullablePartial<UserBase>;
