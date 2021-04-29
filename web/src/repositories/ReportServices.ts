import {
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";
import { ReportService } from "entities/ReportService";
import { DaoBase } from "./_Common";
import { db } from "libs/Firebase";

export const ReportServiceDao = {
  /**
   *
   * @param id 取得するドキュメントID
   * @returns 取得結果のデータ
   */
  async get(reportID: string, id: string): Promise<ReportService | null> {
    if (!db) return null;
    const ref = db.collection("Report").doc(reportID).collection("Service");
    const result = await DaoBase.get<ReportService>(ref, id);
    return result;
  },
  /**
   * @param arg 登録内容
   * @returns 登録したドキュメントID
   */
  async set(reportID: string, arg: ReportService): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("Report").doc(reportID).collection("Service");
    const result = await DaoBase.set(ref, arg);
    return result;
  },
  /**
   *
   * @param arg 追加したいデータ
   * @returns 登録したドキュメントID
   */
  async add(reportID: string, arg: ReportService): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("Report").doc(reportID).collection("Service");
    const result = await DaoBase.add(ref, arg);
    return result;
  },
  /**
   * @param where クエリ条件。指定しない場合は全てのデータを取得
   * @returns クエリ結果
   */
  async query(
    reportID: string,
    where?: (ref: FirebaseCollectionReferenceType) => FirebaseQueryType
  ): Promise<ReportService[] | null> {
    if (!db) return null;
    const ref = db.collection("Report").doc(reportID).collection("Service");
    const result = await DaoBase.query<ReportService>(ref, where);
    return result;
  },
  /**
   * @param id 削除するドキュメント
   * @returns 削除したドキュメントID
   */
  async delete(reportID: string, id: string): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("Report").doc(reportID).collection("Service");
    const result = await DaoBase.delete(ref, id);
    return result;
  },
  /**
   * @param arg 更新するオブジェクト
   * @returns 更新したドキュメントID
   */
  async update(reportID: string, arg: ReportService): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("Report").doc(reportID).collection("Service");
    const result = await DaoBase.update(ref, arg);
    return result;
  },
};
