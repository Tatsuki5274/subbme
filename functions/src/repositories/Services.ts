import { buildService, Service, ServiceUnitEnum, ServiceUnitType } from "../entities/Service";
// import ManagerInterface from "./ManagerInterface"
import firebase from "libs/Firebase"

const db = firebase.firestore();

export class ServiceManager {
  _ref: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor(){
    const serviceRef = db.collection('Service');
    this._ref = serviceRef;
  }

  /**
   * 
   * @param queryResult クエリ結果
   * @returns 整形結果
   */
  async _buildList(queryResult: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>){
    try{
      // const queryResult= await serviceRef.where("userID", "==", "tatsuki");
      const get = await queryResult?.get();
      const doc = get?.docs;
      const result = doc?.map(_doc => {
          return buildService(_doc.id, _doc.data());
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
  async get(id: string){
    try {
      const snapshot = await this._ref.doc(id).get();
      const data = snapshot.data();
      if(!data){
          throw new Error("Empty");
      }
      const user = buildService(id, data);
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
  async add(service: Service){
    try {
      delete service.id;
      this._ref.add(service);
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
        (ref: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>)
          => FirebaseFirestore.Query<FirebaseFirestore.DocumentData>
    ){
    const query = await where(this._ref);
    const data = await this._buildList(query);
    return data;
  }
}

/**
 * 
 * @param unit チェック対象の単位
 * @returns 型チェック結果
 */
export const isServiceUnitType = (unit?: string): unit is ServiceUnitType => {
  for (const value of Object.values(ServiceUnitEnum)) {
    if(value === unit){
      return true;
    }
  }
  return false;
}

export const getServiceUnitValue = (input: ServiceUnitType) => {
    switch(input){
        case ServiceUnitEnum.Day:
          return 1;
        case ServiceUnitEnum.Month:
          return 30;
        case ServiceUnitEnum.Year:
          return 365;
        default:
          throw new Error("Unit is never");
    }
}

export const getServiceUnitString = (input: ServiceUnitType) => {
  switch(input){
    case ServiceUnitEnum.Day:
      return "日";
    case ServiceUnitEnum.Month:
      return "月";
    case ServiceUnitEnum.Year:
      return "年";
    default:
      throw new Error("Unit is never");
}
}