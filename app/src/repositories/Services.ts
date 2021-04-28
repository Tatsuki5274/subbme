import {
  buildService,
  Service,
  ServiceUnitEnum,
  ServiceUnitType,
} from "../entities/Service";
import {
  db,
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";

async function buildList(queryResult: FirebaseQueryType) {
  try {
    // const queryResult= await serviceRef.where("userID", "==", "tatsuki");
    const get = await queryResult?.get();
    const doc = get?.docs;
    const result = doc?.map((_doc) => {
      return buildService(_doc.id, _doc.data());
    });
    return result;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
    return null;
  }
}

export const ServiceDao = {
  /**
   *
   * @param id ドキュメントI
   * @returns 取得結果のデータ
   */
  async get(id: string): Promise<Service | null> {
    const ref = db.collection("Service");
    try {
      const snapshot = await ref.doc(id).get();
      const data = snapshot.data();
      if (!data) {
        throw new Error("Empty");
      }
      const result = buildService(id, data);
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  },
  /**
   * @param arg 登録内容
   * @returns 登録したドキュメントID
   */
  async set(arg: Service): Promise<string | null> {
    const ref = db.collection("Service");
    try {
      if (!arg.id) {
        throw new Error("id is undefined");
      }
      const id = arg.id;
      delete arg.id;
      ref.doc(id).set(arg, { merge: true });
      return id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  },
  /**
   *
   * @param service 追加したいデータ
   * @returns 登録したドキュメントID
   */
  async add(arg: Service): Promise<string | null> {
    const ref = db.collection("Service");
    try {
      delete arg.id;
      const result = await ref.add(arg);
      return result.id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  },
  async query(
    where: (ref: FirebaseCollectionReferenceType) => FirebaseQueryType
  ): Promise<Service[] | null> {
    const ref = db.collection("Service");
    const query = await where(ref);
    const data = await buildList(query);
    return data;
  },
  async delete(id: string): Promise<string | null> {
    const ref = db.collection("Service");
    try {
      await ref.doc(id).delete();
      return id;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  },
  async update(arg: Service): Promise<string | null> {
    const ref = db.collection("Service");
    try {
      const id = arg.id;
      if (!id) {
        throw new Error("ID is not defined");
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

/**
 *
 * @param unit チェック対象の単位
 * @returns 型チェック結果
 */
export const isServiceUnitType = (unit?: string): unit is ServiceUnitType => {
  for (const value of Object.values(ServiceUnitEnum)) {
    if (value === unit) {
      return true;
    }
  }
  return false;
};

export const getServiceUnitValue = (input: ServiceUnitType) => {
  switch (input) {
    case ServiceUnitEnum.Day:
      return 1;
    case ServiceUnitEnum.Month:
      return 30;
    case ServiceUnitEnum.Year:
      return 365;
    default:
      throw new Error("Unit is never");
  }
};

export const getServiceUnitString = (input: ServiceUnitType) => {
  switch (input) {
    case ServiceUnitEnum.Day:
      return "日";
    case ServiceUnitEnum.Month:
      return "月";
    case ServiceUnitEnum.Year:
      return "年";
    default:
      throw new Error("Unit is never");
  }
};
