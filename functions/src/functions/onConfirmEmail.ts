import * as functions from "firebase-functions";
import { UserDao } from "../repositories/Users";
import admin from "../libs/Firebase";

exports.httpEvent = functions.region("us-central1").https.onCall(async (data, context) => {
  const email: string | undefined = data.email;
  const uid = context.auth?.uid;
  let user: admin.auth.UserRecord | null = null
  if(email){
    user = await admin.auth().getUserByEmail(email);
  } else if(uid) {
    user = await admin.auth().getUser(uid);
  } else {
    throw new Error("email and uid are undefined");
  }
  if (user.emailVerified) {
    const result = await UserDao.set({
      uid: user.uid,
      email: user.email,
    })
    console.log(JSON.stringify(result));
  }
  return { message: "success" };
})