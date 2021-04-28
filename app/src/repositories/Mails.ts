import { Mail } from "../entities/Mail";
import {
  db,
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";
import { DaoBase, DaoType } from "./_Common";

export const MailDao: DaoType<Mail> = {
  /**
   *
   * @param id 取得するドキュメントID
   * @returns 取得結果のデータ
   */
  async get(id: string): Promise<Mail | null> {
    const ref = db.collection("Mail");
    const result = await DaoBase.get<Mail>(ref, id);
    return result;
  },
  /**
   * @param arg 登録内容
   * @returns 登録したドキュメントID
   */
  async set(arg: Mail): Promise<string | null> {
    const ref = db.collection("Mail");
    const result = await DaoBase.set(ref, arg);
    return result;
  },
  /**
   *
   * @param arg 追加したいデータ
   * @returns 登録したドキュメントID
   */
  async add(arg: Mail): Promise<string | null> {
    const ref = db.collection("Mail");
    const result = await DaoBase.add(ref, arg);
    return result;
  },
  /**
   * @param where クエリ条件。指定しない場合は全てのデータを取得
   * @returns クエリ結果
   */
  async query(
    where?: (ref: FirebaseCollectionReferenceType) => FirebaseQueryType
  ): Promise<Mail[] | null> {
    const ref = db.collection("Mail");
    const result = await DaoBase.query<Mail>(ref, where);
    return result;
  },
  /**
   * @param id 削除するドキュメント
   * @returns 削除したドキュメントID
   */
  async delete(id: string): Promise<string | null> {
    const ref = db.collection("Mail");
    const result = await DaoBase.delete(ref, id);
    return result;
  },
  /**
   * @param arg 更新するオブジェクト
   * @returns 更新したドキュメントID
   */
  async update(arg: Mail): Promise<string | null> {
    const ref = db.collection("Mail");
    const result = await DaoBase.update(ref, arg);
    return result;
  },
};
