// import { buildUser, User } from "entities/User";
import { buildUserPayment, UserPayment } from "../entities/UserPayment";
import firebase from "../libs/Firebase"
import ManagerInterface from "./ManagerInterface";

const db = firebase.firestore();

export class UserPaymentManager implements ManagerInterface<UserPayment> {
    _ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

    constructor(uid: string) {
        const ref = db.collection('User').doc(uid).collection("Payment");
        this._ref = ref;
    }

    /**
     * 
     * @param queryResult クエリ結果
     * @returns 整形結果
     */
    async _buildList(queryResult: firebase.firestore.Query<firebase.firestore.DocumentData>) {
        try {
            const get = await queryResult?.get();
            const doc = get?.docs;
            const result = doc?.map(_doc => {
                return buildUserPayment(_doc.id, _doc.data());
            })
            return result;
        } catch (e) {
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
            const user = buildUserPayment(id, data);
            return user;
        } catch (e) {
            console.warn(e)
            return null;
        }
    }

    /**
     * 
     * @param service 追加したいデータ
     * @returns 成功・失敗
     */
     async add(payment: UserPayment){
        try {
          delete payment.id;
          const result = await this._ref.add(payment);
          return result;
        } catch (e) {
          console.warn(e);
          return null;
        }
      }

    async set(service: UserPayment){
        try {
          if (!service.id){
            throw new Error("id is undefined");
          }
          const id = service.id;
          delete service.id;
          this._ref.doc(id).set(service);
          return true;
        } catch (e) {
          console.warn(e);
          return false;
        }
      }

    /**
     * 
     * @param where クエリ条件
     * @returns クエリ結果
     */
    async query(
        where:
            (ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>)
                => firebase.firestore.Query<firebase.firestore.DocumentData>
    ) {
        const query = await where(this._ref);
        const data = await this._buildList(query);
        return data;
    }


  async delete(id: string){
    try {
      await this._ref.doc(id).delete();
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  async update(payment: UserPayment){
    try {
      const id = payment.id;
      if (!id) {
        throw new Error("ID is not defined");
      }
      delete payment.id;
      await this._ref.doc(id).update(payment);
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }
}