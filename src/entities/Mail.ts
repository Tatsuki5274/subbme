import { FirebaseDocumentDataType, FirebaseFirestoreTimestampType } from "../libs/Types";
import { NullablePartial } from "../libs/Util";

type MailBase = {
    id: string

    // 宛先メールアドレスを直接指定
    to: string

    // UserコレクションのドキュメントIDのemailフィールドへ送信
    toUids: string
    ccUids: string
    bccUids: string

    // 送信メッセージ
    message: {
        subject: string
        text: string
    }

    createdAt: FirebaseFirestoreTimestampType
    updatedAt: FirebaseFirestoreTimestampType
}