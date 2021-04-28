import { Service, ServiceUnitEnum, ServiceUnitType } from "../entities/Service";
import {
  db,
  FirebaseQueryType,
  FirebaseCollectionReferenceType,
} from "../libs/Types";
import { DaoBase, DaoType } from "./_Common";

export const ServiceDao: DaoType<Service> = {
  /**
   *
   * @param id 取得するドキュメントID
   * @returns 取得結果のデータ
   */
  async get(id: string): Promise<Service | null> {
    const ref = db.collection("Service");
    const result = await DaoBase.get<Service>(ref, id);
    return result;
  },
  /**
   * @param arg 登録内容
   * @returns 登録したドキュメントID
   */
  async set(arg: Service): Promise<string | null> {
    const ref = db.collection("Service");
    const result = await DaoBase.set(ref, arg);
    return result;
  },
  /**
   *
   * @param arg 追加したいデータ
   * @returns 登録したドキュメントID
   */
  async add(arg: Service): Promise<string | null> {
    const ref = db.collection("Service");
    const result = await DaoBase.add(ref, arg);
    return result;
  },
  /**
   * @param where クエリ条件。指定しない場合は全てのデータを取得
   * @returns クエリ結果
   */
  async query(
    where?: (ref: FirebaseCollectionReferenceType) => FirebaseQueryType
  ): Promise<Service[] | null> {
    const ref = db.collection("Service");
    const result = await DaoBase.query<Service>(ref, where);
    return result;
  },
  /**
   * @param id 削除するドキュメント
   * @returns 削除したドキュメントID
   */
  async delete(id: string): Promise<string | null> {
    const ref = db.collection("Service");
    const result = await DaoBase.delete(ref, id);
    return result;
  },
  /**
   * @param arg 更新するオブジェクト
   * @returns 更新したドキュメントID
   */
  async update(arg: Service): Promise<string | null> {
    const ref = db.collection("Service");
    const result = await DaoBase.update(ref, arg);
    return result;
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
