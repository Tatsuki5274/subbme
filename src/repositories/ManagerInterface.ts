import { FirebaseQueryType, FirebaseCollectionReferenceType, FirebaseDocumentReferenceType } from "../libs/Types";
import { NullablePartial } from "../libs/Util";

export default interface ManagerInterface<T>{
    _ref: FirebaseCollectionReferenceType
    _buildList(queryResult: FirebaseQueryType): Promise<NullablePartial<T>[] | null>
    get(id: string): Promise<NullablePartial<T> | null>
    add(arg: T): Promise<FirebaseDocumentReferenceType | null>
    set(arg: T): Promise<boolean>
    delete(id: string): Promise<boolean>
    update(arg: T): Promise<boolean>
    query(
        where: (
            ref: FirebaseCollectionReferenceType
        ) => FirebaseQueryType
    ): Promise<NullablePartial<T>[] | null>
}