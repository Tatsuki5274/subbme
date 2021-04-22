import { buildReport, Report } from "../entities/Report";
import ManagerInterface from "./ManagerInterface";
import {
  db,
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";

export class ReportManager implements ManagerInterface<Report> {
  _ref: FirebaseCollectionReferenceType;

  constructor() {
    const reportRef = db.collection("Report");
    this._ref = reportRef;
  }

  /**
   *
   * @param queryResult クエリ結果
   * @returns 整形結果
   */
  async _buildList(queryResult: FirebaseQueryType) {
    try {
      // const queryResult= await reportRef.where("userID", "==", "tatsuki");
      const get = await queryResult?.get();
      const doc = get?.docs;
      const result = doc?.map((_doc) => {
        return buildReport(_doc.id, _doc.data());
      });
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  }

  /**
   *
   * @param id ドキュメントI
   * @returns 取得結果のデータ
   */
  async get(id: string) {
    try {
      const snapshot = await this._ref.doc(id).get();
      const data = snapshot.data();
      if (!data) {
        throw new Error("Empty");
      }
      const user = buildReport(id, data);
      return user;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  }

  async set(report: Report) {
    try {
      if (!report.id) {
        throw new Error("id is undefined");
      }
      const id = report.id;
      delete report.id;
      this._ref.doc(id).set(report, { merge: true });
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }

  /**
   *
   * @param report 追加したいデータ
   * @returns 成功・失敗
   */
  async add(report: Report) {
    try {
      delete report.id;
      const result = await this._ref.add(report);
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  }

  /**
   *
   * @param where クエリ条件
   * @returns クエリ結果
   */
  async query(
    where: (ref: FirebaseCollectionReferenceType) => FirebaseQueryType
  ) {
    const query = await where(this._ref);
    const data = await this._buildList(query);
    return data;
  }

  async delete(id: string) {
    try {
      await this._ref.doc(id).delete();
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }

  async update(report: Report) {
    try {
      const id = report.id;
      if (!id) {
        throw new Error("ID is not defined");
      }
      delete report.id;
      await this._ref.doc(id).update(report);
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }
}
