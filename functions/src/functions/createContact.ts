import { Contact } from "../entities/Contact";
import * as functions from "firebase-functions";
import { ContactManager } from "../repositories/Contacts";
import axiosBase from "axios";
import admin from "../libs/Firebase";

const httpEvent = functions.region("us-central1").https.onCall(async (arg: { data: Contact, token: string}, context) => {
  const contact = arg.data;

  const axios = axiosBase.create({
    baseURL: "https://www.google.com",
    // headers: {
    //   'Content-Type': 'application/json',
    //   'X-Requested-With': 'XMLHttpRequest'
    // },
    responseType: "json"
  });
  const verifyResult = await axios.post("/recaptcha/api/siteverify")
  console.log("ver", verifyResult.data);
  const isSuccess = verifyResult.data.success;
  const errorCodes: string[] | undefined = verifyResult.data["error-codes"];
  console.log("success", isSuccess);
  console.log("error", errorCodes);

  if (!isSuccess) {
    console.error(verifyResult.data);
    throw new Error("Faild challenge.");
  }


  const manager = new ContactManager();
  const result = await manager.add(contact);

  console.log("token", arg.token);
  
  // TODO 受付メールの送信
  // const email = data.email;
  
  return result?.id;
});
export {httpEvent};
