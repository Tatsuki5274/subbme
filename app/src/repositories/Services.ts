import {
  buildService,
  Service,
  ServiceUnitEnum,
  ServiceUnitType,
} from "../entities/Service";
import ManagerInterface from "./ManagerInterface";
import {
  db,
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";

export class ServiceManager implements ManagerInterface<Service> {
  _ref: FirebaseCollectionReferenceType;

  constructor() {
    const serviceRef = db.collection("Service");
    this._ref = serviceRef;
  }

  /**
   *
   * @param queryResult クエリ結果
   * @returns 整形結果
   */
  async _buildList(queryResult: FirebaseQueryType) {
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
      const user = buildService(id, data);
      return user;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return null;
    }
  }

  async set(service: Service) {
    try {
      if (!service.id) {
        throw new Error("id is undefined");
      }
      const id = service.id;
      delete service.id;
      this._ref.doc(id).set(service, { merge: true });
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }

  /**
   *
   * @param service 追加したいデータ
   * @returns 成功・失敗
   */
  async add(service: Service) {
    try {
      delete service.id;
      const result = await this._ref.add(service);
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

  async update(service: Service) {
    try {
      const serviceID = service.id;
      if (!serviceID) {
        throw new Error("ID is not defined");
      }
      delete service.id;
      await this._ref.doc(serviceID).update(service);
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return false;
    }
  }
}

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
