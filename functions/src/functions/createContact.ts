import { Contact } from "../entities/Contact";
import * as functions from "firebase-functions";
import { ContactManager } from "../repositories/Contacts";
import admin from "../libs/Firebase";

const httpEvent = functions.region("us-central1").https.onCall(async (data: Contact, context) => {
  const manager = new ContactManager();
  const result = await manager.add(data);
  
  // TODO 受付メールの送信
  const email = data.email;
  
  return result?.id;
});
export {httpEvent};
