import { FirebaseQueryType, FirebaseReferenceType } from "libs/Types";
import { NullablePartial } from "libs/Util";

export default interface ManagerInterface<T>{
    _ref: FirebaseReferenceType
    _buildList(queryResult: FirebaseQueryType): Promise<NullablePartial<T>[] | null>
    get(id: string): Promise<NullablePartial<T> | null>
    add(arg: T): Promise<boolean>
    query(
        where: (
            ref: FirebaseReferenceType
        ) => FirebaseQueryType
    ): Promise<NullablePartial<T>[] | null>
}