/* eslint-disable new-cap */

import * as functions from "firebase-functions";
import { UserDao } from "../repositories/Users";
// import * as admin from 'firebase-admin';

export default functions
.region("asia-northeast1")
.auth
.user()
.onDelete(async (user) => {
  try {
    await UserDao.delete(user.uid);

    // pay.jpの顧客を削除
    const sk = functions.config().payjp.sk;
    if (!(typeof sk === "string")) {
      // 秘密鍵がfunctions configに設定されていない場合
      throw new Error("SecretKey is not set");
    }
  } catch (e) {
    throw new Error(e);
  }
});
