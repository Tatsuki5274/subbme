import { buildUser, User } from "entities/User";
import firebase from "libs/Firebase"

const db = firebase.firestore();

export class ServiceManager {
    private ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

    constructor() {
        const serviceRef = db.collection('User');
        this.ref = serviceRef;
    }

    /**
     * 
     * @param queryResult クエリ結果
     * @returns 整形結果
     */
    private async buildList(queryResult: firebase.firestore.Query<firebase.firestore.DocumentData>) {
        try {
            // const queryResult= await serviceRef.where("userID", "==", "tatsuki");
            const get = await queryResult?.get();
            const doc = get?.docs;
            const result = doc?.map(_doc => {
                return buildUser(_doc.id, _doc.data());
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
            const snapshot = await this.ref.doc(id).get();
            const data = snapshot.data();
            if (!data) {
                throw new Error("Empty");
            }
            const user = buildUser(id, data);
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
    async add(user: User) {
        try {
            delete user.uid;
            this.ref.add(user);
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
        const query = await where(this.ref);
        const data = await this.buildList(query);
        return data;
    }
}