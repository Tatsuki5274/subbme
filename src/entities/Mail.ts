import {
  FirebaseDocumentDataType,
  FirebaseFirestoreTimestampType,
} from "../libs/Types";
import { NullablePartial } from "../libs/Util";

type MailBase = {
  id: string;

  from?: string;

  // 直接かUserのドキュメントIDのどちらかが必須
  // 宛先メールアドレスを直接指定する場合
  to?: string;
  cc?: string;
  bcc?: string;
  replyTo?: string;
  // UserコレクションのドキュメントIDのemailフィールドへ送信する場合
  toUids?: string[];
  ccUids?: string[];
  bccUids?: string[];

  // 送信メッセージ どちらか必須
  // 本文を直接指定する場合
  message?: {
    subject: string;
    text: string;
  };
  // 本文をテンプレートから指定する場合
  template?: {
    name: string;
    data?: {
      [key: string]: string;
    };
  };
};
