import { NullablePartial } from "../libs/Util";

type ContactBase = {
  id: string;
  title: string;
  email: string;
  category: string;
  body: string;
};

export type Contact = NullablePartial<ContactBase>;
