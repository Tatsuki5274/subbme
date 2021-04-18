import {
  FirebaseDocumentDataType,
  FirebaseFirestoreTimestampType,
} from "../libs/Types";
import { NullablePartial } from "../libs/Util";

type UserBase = {
  uid: string;
  lastLoginDate: FirebaseFirestoreTimestampType;
  currency: "JPY";
  LastReportCreatedAt: FirebaseFirestoreTimestampType;
  email: string;
  // isSendReportEmail
  createdAt: FirebaseFirestoreTimestampType;
  updatedAt: FirebaseFirestoreTimestampType;
};

export type User = NullablePartial<UserBase>;

export const buildUser = (uid: string, data: FirebaseDocumentDataType) => {
  const user: User = {
    uid,
    ...data,
  };

  return user;
};
