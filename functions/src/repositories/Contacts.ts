import { buildContact, Contact } from "../entities/Contact";
import ManagerInterface from "./ManagerInterface";
import {
  db,
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";

export class ContactManager implements ManagerInterface<Contact> {
  _ref: FirebaseCollectionReferenceType;

  constructor() {
    const contactRef = db.collection("Contact");
    this._ref = contactRef;
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
        return buildContact(_doc.id, _doc.data());
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
      const user = buildContact(id, data);
      return user;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  }

  async set(contact: Contact) {
    try {
      if (!contact.id) {
        throw new Error("id is undefined");
      }
      const id = contact.id;
      delete contact.id;
      this._ref.doc(id).set(contact, { merge: true });
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }

  /**
   *
   * @param contact 追加したいデータ
   * @returns 成功・失敗
   */
  async add(contact: Contact) {
    try {
      delete contact.id;
      const result = await this._ref.add(contact);
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

  async update(contact: Contact) {
    try {
      const contactID = contact.id;
      if (!contactID) {
        throw new Error("ID is not defined");
      }
      delete contact.id;
      await this._ref.doc(contactID).update(contact);
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }
}
