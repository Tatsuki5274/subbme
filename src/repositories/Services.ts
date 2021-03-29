import { buildService, Service, ServiceUnitEnum, ServiceUnitType } from "entities/Service";
import firebase from "libs/Firebase"

const db = firebase.firestore();

export class ServiceManager{
  private ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

  constructor(){
    const serviceRef = db.collection('Service');
    this.ref = serviceRef;
  }

  private async buildList(queryResult: firebase.firestore.Query<firebase.firestore.DocumentData>){
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

  async get(id: string){
    try {
      const snapshot = await serviceRef.doc(id).get();
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

  async add(service: Service){
    try {
      this.ref.add(service);
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  async query(
      where: 
        (ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>)
          => firebase.firestore.Query<firebase.firestore.DocumentData> 
    ){
    const query = await where(this.ref);
    const data = await this.buildList(query);
    return data;
  }
}

const serviceRef = db.collection('Service');

/**
 * 
 * @param id 
 * @returns 
 * @deprecated
 */
export const getService = async (id: string) => {
    try {
      const snapshot = await serviceRef.doc(id).get();
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
 * @param service 
 * @returns 
 * @deprecated
 */
export const addService = async (service: Service ) => {
  try {
      serviceRef.add(service);
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

/**
 * 
 * @returns 
 * @deprecated
 */
export const getServiceRef = () => {
  return serviceRef;
}

/**
 * 
 * @param queryResult 
 * @returns 
 * @deprecated
 */
export const listService = async (queryResult: firebase.firestore.Query<firebase.firestore.DocumentData>) => {
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