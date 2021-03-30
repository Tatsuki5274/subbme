import firebase from "libs/Firebase"
import { NullablePartial } from "libs/Util";

export default interface ManagerInterface<T>{
    _ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
    _buildList(queryResult: firebase.firestore.Query<firebase.firestore.DocumentData>): Promise<NullablePartial<T>[] | null>
    get(id: string): Promise<NullablePartial<T> | null>
    add(arg: T): Promise<boolean>
    query(
        where: (
            ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
        ) => firebase.firestore.Query<firebase.firestore.DocumentData>
    ): Promise<NullablePartial<T>[] | null>
}