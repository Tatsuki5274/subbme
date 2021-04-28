import {
  FirebaseCollectionReferenceType,
  FirebaseDocumentDataType,
  FirebaseQueryType,
} from "../libs/Types";

const buildType = (id: string, data: FirebaseDocumentDataType) => {
  const user: unknown = {
    id,
    ...data,
  };
  return user;
};

const buildList = async (queryResult: FirebaseQueryType) => {
  try {
    // const queryResult= await serviceRef.where("userID", "==", "tatsuki");
    const get = await queryResult?.get();
    const doc = get?.docs;
    const result = doc?.map((_doc) => {
      return buildType(_doc.id, _doc.data());
    });
    return result;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
    return null;
  }
};

type QueryFuncType = (
  ref: FirebaseCollectionReferenceType
) => FirebaseQueryType;

export type DaoType<T> = {
  get: (id: string) => Promise<T | null>;
  set: (arg: T) => Promise<string | null>;
  add: (arg: T) => Promise<string | null>;
  query: (where?: QueryFuncType) => Promise<T[] | null>;
  delete: (id: string) => Promise<string | null>;
  update: (arg: T) => Promise<string | null>;
};

export const DaoBase = {
  async get<Type>(
    ref: FirebaseCollectionReferenceType,
    id: string
  ): Promise<Type | null> {
    try {
      const snapshot = await ref.doc(id).get();
      const data = snapshot.data();
      if (!data) {
        throw new Error("Empty");
      }
      const result = buildType(id, data) as Type; // unsafe
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  },
  async set(
    ref: FirebaseCollectionReferenceType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arg: any
  ): Promise<string | null> {
    try {
      const id = arg?.id;
      if (typeof arg !== "object") {
        throw new Error("arg is not object");
      } else if (typeof id !== "string") {
        throw new Error("id is undefined");
      }

      delete arg.id;
      ref.doc(id).set(arg, { merge: true });
      return id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  },
  async add(
    ref: FirebaseCollectionReferenceType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arg: any
  ): Promise<string | null> {
    try {
      if (typeof arg !== "object") {
        throw new Error("arg is not object");
      }
      delete arg.id;
      const result = await ref.add(arg);
      return result.id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  },
  async query<Type>(
    ref: FirebaseCollectionReferenceType,
    where?: (ref: FirebaseCollectionReferenceType) => FirebaseQueryType
  ): Promise<Type[] | null> {
    if (where) {
      // クエリ条件が指定されていた場合はクエリを発行する
      const query = await where(ref);
      const data = await buildList(query);
      return data as Type[] | null; // unsafe
    } else {
      // クエリ条件が指定されていなかった場合はコレクション全てのデータを取得する
      const data = await buildList(ref);
      return data as Type[] | null; // unsafe
    }
  },
  async delete(
    ref: FirebaseCollectionReferenceType,
    id: string
  ): Promise<string | null> {
    try {
      await ref.doc(id).delete();
      return id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  },
  async update(
    ref: FirebaseCollectionReferenceType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arg: any
  ): Promise<string | null> {
    try {
      const id = arg.id;
      if (typeof arg !== "object") {
        throw new Error("arg is not object");
      } else if (typeof id !== "string") {
        throw new Error("id is undefined");
      }
      delete arg.id;
      await ref.doc(id).update(arg);
      return ref.id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  },
};
