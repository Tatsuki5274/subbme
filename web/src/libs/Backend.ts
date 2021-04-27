import firebase from "libs/Firebase";
import { Contact } from "../entities/Contact";

// 仮の実装
// TypeManagerに移行

export const ContactManager = {
  create: async (data: Contact): Promise<unknown> => {
    const CreateContact = firebase
      .functions()
      .httpsCallable("createContact-httpEvent");
    const result = await CreateContact(data);
    return result;
  },
};
