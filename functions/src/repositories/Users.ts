/* eslint-disable valid-jsdoc, require-jsdoc */

import {buildUser, User} from "../entities/User";
import
{db, FirebaseQueryType, FirebaseCollectionReferenceType}
  from "../libs/Types";

// import firebase from "libs/Firebase"
import ManagerInterface from "./ManagerInterface";
import {UserPaymentManager} from "./UserPayments";

/**
 * @description コレクションリファレンスを管理するクラス
 */
export class UserManager implements ManagerInterface<User> {
    _ref: FirebaseCollectionReferenceType

    /**
     * @description コレクションリファレンスの場所を決定する
     */
    constructor() {
      const serviceRef = db.collection("User");
      this._ref = serviceRef;
    }

    /**
     *
     * @param queryResult クエリ結果
     * @return 整形結果
     */
    async _buildList(queryResult: FirebaseQueryType) {
      try {
        // const queryResult= await serviceRef.where("userID", "==", "tatsuki");
        const get = await queryResult?.get();
        const doc = get?.docs;
        const result = doc?.map((_doc) => {
          return buildUser(_doc.id, _doc.data());
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
        const user = buildUser(id, data);
        return user;
      } catch (e) {
        console.warn(e);
        return null;
      }
    }

    /**
     *
     * @param service 追加したいデータ
     * @return 成功・失敗
     */
    async add(user: User) {
      try {
        delete user.uid;
        const result = await this._ref.add(user);
        return result;
      } catch (e) {
        console.warn(e);
        return null;
      }
    }

    async set(user: User) {
      try {
        if (!user.uid) {
          throw new Error("id is undefined");
        }
        const id = user.uid;
        delete user.uid;
        this._ref.doc(id).set(user);
        return true;
      } catch (e) {
        console.warn(e);
        return false;
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

    async update(user: User) {
      try {
        const serviceID = user.uid;
        if (!serviceID) {
          throw new Error("ID is not defined");
        }
        delete user.uid;
        await this._ref.doc(serviceID).update(user);
        return true;
      } catch (e) {
        console.warn(e);
        return false;
      }
    }

    getUserPaymentManager() {
      const payment = new UserPaymentManager(this._ref.id);
      return payment;
    }
}
