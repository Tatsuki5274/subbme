import firebase from "libs/Firebase";
import { Contact } from "../entities/Contact";

// 仮の実装
// TypeManagerに移行

export const ContactManager = {
  create: async (data: Contact, token: string): Promise<unknown> => {
    // if (typeof window !== "undefined") {
    //   const a = firebase.functions();
    // }
    const CreateContact = firebase
      .functions()
      .httpsCallable("createContact-httpEvent");
    const result = await CreateContact({ data, token });
    return result.data;
  },
};
