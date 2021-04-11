import { FirebaseDocumentDataType } from "libs/Types";
import { NullablePartial } from "libs/Util";

type MailTemplateBase = {
  id: string;

  // メール件名
  subject: string;

  // メール本文
  text: string;
  html: string;

  // メールの部品
  partial: boolean;
};

export type MailTemplate = NullablePartial<MailTemplateBase>;

export const buildMailTemplate = (
  id: string,
  data: FirebaseDocumentDataType
) => {
  const mail: MailTemplate = {
    id,
    ...data,
  };

  return mail;
};
