import { buildMail, Mail } from "../entities/Mail";
import ManagerInterface from "./ManagerInterface";
import {
  db,
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";

export class MailManager implements ManagerInterface<Mail> {
  _ref: FirebaseCollectionReferenceType;

  constructor() {
    const mailRef = db.collection("Mail");
    this._ref = mailRef;
  }

  /**
   *
   * @param queryResult クエリ結果
   * @returns 整形結果
   */
  async _buildList(queryResult: FirebaseQueryType) {
    try {
      const get = await queryResult?.get();
      const doc = get?.docs;
      const result = doc?.map((_doc) => {
        return buildMail(_doc.id, _doc.data());
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
      const user = buildMail(id, data);
      return user;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  }

  async set(mail: Mail) {
    try {
      if (!mail.id) {
        throw new Error("id is undefined");
      }
      const id = mail.id;
      delete mail.id;
      this._ref.doc(id).set(mail, { merge: true });
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }

  /**
   *
   * @param mail 追加したいデータ
   * @returns 成功・失敗
   */
  async add(mail: Mail) {
    try {
      delete mail.id;
      const result = await this._ref.add(mail);
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

  async update(mail: Mail) {
    try {
      const mailID = mail.id;
      if (!mailID) {
        throw new Error("ID is not defined");
      }
      delete mail.id;
      await this._ref.doc(mailID).update(mail);
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }
}
