import { FirebaseFirestoreTimestampType } from "../libs/Types";
import { NullablePartial } from "../libs/Util";

type AgreementType = {
  version: string; // 規約のバージョン
  agreedAt: FirebaseFirestoreTimestampType; // 同意日付
}[];

type UserBase = {
  id: string;
  lastLoginDate: FirebaseFirestoreTimestampType;
  currency: "JPY";
  LastReportCreatedAt: FirebaseFirestoreTimestampType;
  email: string;
  // isSendReportEmail
  agreements: {
    privacy: AgreementType; // プライバシーポリシへの同意状況
  };
  createdAt: FirebaseFirestoreTimestampType;
  updatedAt: FirebaseFirestoreTimestampType;
};

export type User = NullablePartial<UserBase>;
