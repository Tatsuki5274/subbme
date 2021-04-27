import { FirebaseDocumentDataType } from "../libs/Types";
import { NullablePartial } from "../libs/Util";

type ContactBase = {
  id: string;
  title: string;
  email: string;
  category: string;
  body: string;
};

export type Contact = NullablePartial<ContactBase>;

export const buildContact = (id: string, data: FirebaseDocumentDataType) => {
  const mail: Contact = {
    id,
    ...data,
  };

  return mail;
};
