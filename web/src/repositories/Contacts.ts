import firebase from "libs/Firebase";
import { Contact } from "../entities/Contact";
import {
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";
import { DaoBase } from "./_Common";

let db: firebase.firestore.Firestore | null = null;

if (typeof window !== "undefined") {
  // gatsby buildでない場合のみ実行
  db = firebase.firestore();
}

export const ContactDao = {
  /**
   *
   * @param id 取得するドキュメントID
   * @returns 取得結果のデータ
   */
  async get(id: string): Promise<Contact | null> {
    if (!db) return null;
    const ref = db.collection("Contact");
    const result = await DaoBase.get<Contact>(ref, id);
    return result;
  },
  /**
   * @param arg 登録内容
   * @returns 登録したドキュメントID
   */
  async set(arg: Contact): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("Contact");
    const result = await DaoBase.set(ref, arg);
    return result;
  },
  /**
   *
   * @param arg 追加したいデータ
   * @param token recaptchaのトークン
   * @returns 登録したドキュメントID
   */
  async add(arg: Contact, token: string): Promise<string | null> {
    try {
      const CreateContact = firebase
        .functions()
        .httpsCallable("createContact-httpEvent");
      const result = await CreateContact({ data: arg, token });
      const id: string | null = result.data?.id || null;
      return id;
    } catch (e) {
      return null;
    }
  },
  /**
   * @param where クエリ条件。指定しない場合は全てのデータを取得
   * @returns クエリ結果
   */
  async query(
    where?: (ref: FirebaseCollectionReferenceType) => FirebaseQueryType
  ): Promise<Contact[] | null> {
    if (!db) return null;
    const ref = db.collection("Contact");
    const result = await DaoBase.query<Contact>(ref, where);
    return result;
  },
  /**
   * @param id 削除するドキュメント
   * @returns 削除したドキュメントID
   */
  async delete(id: string): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("Contact");
    const result = await DaoBase.delete(ref, id);
    return result;
  },
  /**
   * @param arg 更新するオブジェクト
   * @returns 更新したドキュメントID
   */
  async update(arg: Contact): Promise<string | null> {
    if (!db) return null;
    const ref = db.collection("Contact");
    const result = await DaoBase.update(ref, arg);
    return result;
  },
};
