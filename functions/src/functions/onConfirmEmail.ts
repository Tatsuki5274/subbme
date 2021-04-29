import * as functions from "firebase-functions";
import { UserDao } from "../repositories/Users";
import admin from "../libs/Firebase";
import { MailDao } from "../repositories/Mails";

exports.httpEvent = functions.region("us-central1").https.onCall(async (data, context) => {
  const email: string | undefined = data.email;
  // const uid = context.auth?.uid;
  let user: admin.auth.UserRecord | null = null
  if(email){
    user = await admin.auth().getUserByEmail(email);
  }
  // else if(uid) {
  //   user = await admin.auth().getUser(uid);
  // } 
  else {
    throw new Error("email and uid are undefined");
  }
  if (user.emailVerified) {
    const resultUser = await UserDao.set({
      id: user.uid,
      email: user.email,
    });
    console.log("user", resultUser);
    if (resultUser) {
      const resultMail = await MailDao.add({
        toUids: [user.uid],
        template: {
          name: "email-confirm",
        }
      });
      console.log("mail", resultMail);
    }
  }
  return { message: "success" };
})