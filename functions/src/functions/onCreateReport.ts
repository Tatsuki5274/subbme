import * as functions from "firebase-functions";
import { ReportDao } from "../repositories/Reports";
import admin from "../libs/Firebase";
import { UserDao } from "../repositories/Users";

export default functions.firestore.document("Report/{reportID}").onCreate(async (snap, context) => {
  try {
    const reportID: unknown = context.params.reportID;

    if(typeof reportID !== "string") {
      // ドキュメントIDが存在しない場合
      throw new Error("reportID is not string. maybe undefined");
    }

    const createdReport = await ReportDao.get(reportID);

    if(!createdReport) {
      throw new Error("Report is not found");
    } else if(!createdReport.userID) {
      throw new Error("userID in the created report is undefined");
    }
    

    // レポートの最終作成日を記録
    await UserDao.update({
      id: createdReport.userID,
      LastReportCreatedAt: admin.firestore.Timestamp.now()
    })
  } catch (e) {
    console.error(e);
  }
})