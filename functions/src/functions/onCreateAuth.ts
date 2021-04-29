// import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserDao } from "../repositories/Users";
import { MailDao } from "../repositories/Mails";

export default functions
.region("asia-northeast1")
.auth
.user()
.onCreate(async (user) => {
  try {
    // firestoreへユーザー情報を追加
    await UserDao.set({
      id: user.uid,
      createdAt: admin.firestore.Timestamp.now()
    });

    await admin.auth().setCustomUserClaims(user.uid, {
      plan: "free",
      type: "customer",
    });

    // welcomeメールを送信
    const result = await MailDao.add({
      to: user.email,
      template: {
        name: "welcome",
      },
    })
    console.log("result", JSON.stringify(result));
    return user.uid;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});
