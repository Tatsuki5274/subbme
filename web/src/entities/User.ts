import { FirebaseFirestoreTimestampType } from "../libs/Types";
import { NullablePartial } from "../libs/Util";

type AgreementPoliciesType = {
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
  agreementPolicies: {
    privacy: AgreementPoliciesType; // プライバシーポリシへの同意状況
  };
  agreementMails: {
    serviceMail: FirebaseFirestoreTimestampType | null; // サービスの通知などの機能メール
    promotionMail: FirebaseFirestoreTimestampType | null; // 広告メール
  };
  createdAt: FirebaseFirestoreTimestampType;
  updatedAt: FirebaseFirestoreTimestampType;
};

export type User = NullablePartial<UserBase>;
