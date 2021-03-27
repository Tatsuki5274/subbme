import { buildService, Service } from "entities/Service";
import firebase from "libs/Firebase"

const db = firebase.firestore();
const serviceRef = db.collection('Service');

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

export const addService = async (service: Service ) => {
  try {
      serviceRef.add(service);
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

export const getServiceRef = () => {
  return serviceRef;
}

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