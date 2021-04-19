// import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import {UserManager} from "../repositories/Users";
import * as admin from "firebase-admin";
import { MailManager } from "../repositories/Mails";

export default functions
.region("asia-northeast1")
.auth
.user()
.onCreate(async (user) => {
  try {
    // pay.jpの顧客を作成
    const sk = functions.config().payjp.sk;
    if (!(typeof sk === "string")) {
      // 秘密鍵がfunctions configに設定されていない場合
      throw new Error("SecretKey is not set");
    }

    // firestoreへユーザー情報を追加
    const userManager = new UserManager();
    await userManager.set({
      uid: user.uid,
      email: user.email,  // 認証済みのメールアドレスとして扱う(仮実装)
      createdAt: admin.firestore.Timestamp.now()
    });

    await admin.auth().setCustomUserClaims(user.uid, {
      plan: "free",
    });

    // welcomeメールを送信
    const mailManager = new MailManager();
    const result = await mailManager.add({
      toUids: [
        user.uid
      ],
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
