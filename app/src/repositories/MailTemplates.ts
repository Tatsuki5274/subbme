import { buildMailTemplate, MailTemplate } from "../entities/MailTemplate";
import ManagerInterface from "./ManagerInterface";
import {
  db,
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";

export class MailTemplateManager implements ManagerInterface<MailTemplate> {
  _ref: FirebaseCollectionReferenceType;

  constructor() {
    const mailTemplateRef = db.collection("MailTemplate");
    this._ref = mailTemplateRef;
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
        return buildMailTemplate(_doc.id, _doc.data());
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
      const user = buildMailTemplate(id, data);
      return user;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  }

  async set(mailTemplate: MailTemplate) {
    try {
      if (!mailTemplate.id) {
        throw new Error("id is undefined");
      }
      const id = mailTemplate.id;
      delete mailTemplate.id;
      this._ref.doc(id).set(mailTemplate, { merge: true });
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }

  /**
   *
   * @param mailTemplate 追加したいデータ
   * @returns 成功・失敗
   */
  async add(mailTemplate: MailTemplate) {
    try {
      delete mailTemplate.id;
      const result = await this._ref.add(mailTemplate);
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

  async update(mailTemplate: MailTemplate) {
    try {
      const mailTemplateID = mailTemplate.id;
      if (!mailTemplateID) {
        throw new Error("ID is not defined");
      }
      delete mailTemplate.id;
      await this._ref.doc(mailTemplateID).update(mailTemplate);
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }
}
