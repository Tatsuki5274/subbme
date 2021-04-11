import * as functions from "firebase-functions";
import admin from "../libs/Firebase";
import { UserManager } from "../repositories/Users";

export default functions.firestore.document("Report/{reportID}").onCreate(async (snap, context) => {
  try {
    const reportID: unknown = context.params.reportID;

    if(typeof reportID !== "string") {
      // ドキュメントIDが存在しない場合
      throw new Error("reportID is not string. maybe undefined");
    }
    
    // レポートの最終作成日を記録
    const userManager = new UserManager();
    await userManager.update({
      uid: reportID,
      LastReportCreatedAt: admin.firestore.Timestamp.now()
    })
  } catch (e) {
    console.error(e);
  }
})