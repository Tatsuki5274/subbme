import { db } from "libs/Firebase";
import { MailTemplate } from "../entities/MailTemplate";
import {
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";
import { DaoBase, DaoType } from "./_Common";

export const MailTemplateDao: DaoType<MailTemplate> = {
  /**
   *
   * @param id 取得するドキュメントID
   * @returns 取得結果のデータ
   */
  async get(id: string): Promise<MailTemplate | null> {
    if (!db) return null;
    const ref = db.collection("MailTemplate");
    const result = await DaoBase.get<MailTemplate>(ref, id);
    return result;
  },
  /**
   * @param arg 登録内容
   * @returns 登録したドキュメントID
   */
  async set(arg: MailTemplate): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("MailTemplate");
    const result = await DaoBase.set(ref, arg);
    return result;
  },
  /**
   *
   * @param arg 追加したいデータ
   * @returns 登録したドキュメントID
   */
  async add(arg: MailTemplate): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("MailTemplate");
    const result = await DaoBase.add(ref, arg);
    return result;
  },
  /**
   * @param where クエリ条件。指定しない場合は全てのデータを取得
   * @returns クエリ結果
   */
  async query(
    where?: (ref: FirebaseCollectionReferenceType) => FirebaseQueryType
  ): Promise<MailTemplate[] | null> {
    if (!db) return null;
    const ref = db.collection("MailTemplate");
    const result = await DaoBase.query<MailTemplate>(ref, where);
    return result;
  },
  /**
   * @param id 削除するドキュメント
   * @returns 削除したドキュメントID
   */
  async delete(id: string): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("MailTemplate");
    const result = await DaoBase.delete(ref, id);
    return result;
  },
  /**
   * @param arg 更新するオブジェクト
   * @returns 更新したドキュメントID
   */
  async update(arg: MailTemplate): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("MailTemplate");
    const result = await DaoBase.update(ref, arg);
    return result;
  },
};
