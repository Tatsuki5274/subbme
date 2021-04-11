/* eslint-disable valid-jsdoc, require-jsdoc */

import {buildReport, Report} from "../entities/Report";
import ManagerInterface from "./ManagerInterface";
import
{db, FirebaseQueryType, FirebaseCollectionReferenceType}
  from "../libs/Types";
/**
 * @description コレクションリファレンスを管理するクラス
 */
export class ReportManager implements ManagerInterface<Report> {
  _ref: FirebaseCollectionReferenceType

  /**
   * @description コレクションリファレンスの場所を決定する
   */
  constructor() {
    const reportRef = db.collection("Report");
    this._ref = reportRef;
  }

  /**
   *
   * @param queryResult クエリ結果
   * @return 整形結果
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
      console.warn(e);
      return null;
    }
  }

  /**
   *
   * @param id ドキュメントI
   * @return 取得結果のデータ
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
      this._ref.doc(id).set(report);
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  /**
   *
   * @param report 追加したいデータ
   * @return 成功・失敗
   */
  async add(report: Report) {
    try {
      delete report.id;
      const result = await this._ref.add(report);
      return result;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  /**
   *
   * @param where クエリ条件
   * @return クエリ結果
   */
  async query(
      where:
        (ref: FirebaseCollectionReferenceType)
          => FirebaseQueryType
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
      console.warn(e);
      return false;
    }
  }
}
