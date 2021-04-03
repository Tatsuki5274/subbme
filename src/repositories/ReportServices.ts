import { buildReportService, ReportService } from "entities/ReportService";
import ManagerInterface from "./ManagerInterface"
import { db, FirebaseQueryType, FirebaseCollectionReferenceType } from "libs/Types";


export class ReportServiceManager implements ManagerInterface<ReportService>{
  _ref: FirebaseCollectionReferenceType

  constructor(reportID: string){
    const reportServiceRef = db.collection('Report').doc(reportID).collection('Service');
    this._ref = reportServiceRef;
  }

  /**
   * 
   * @param queryResult クエリ結果
   * @returns 整形結果
   */
  async _buildList(queryResult: FirebaseQueryType){
    try{
      // const queryResult= await reportServiceRef.where("userID", "==", "tatsuki");
      const get = await queryResult?.get();
      const doc = get?.docs;
      const result = doc?.map(_doc => {
          return buildReportService(_doc.id, _doc.data());
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
      const user = buildReportService(id, data);
      return user;
    } catch (e) {
      console.warn(e)
      return null;
    }
  }

  async set(reportService: ReportService){
    try {
      if (!reportService.id){
        throw new Error("id is undefined");
      }
      const id = reportService.id;
      delete reportService.id;
      this._ref.doc(id).set(reportService);
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  /**
   * 
   * @param reportService 追加したいデータ
   * @returns 成功・失敗
   */
   async add(reportService: ReportService){
    try {
      delete reportService.id;
      const result = await this._ref.add(reportService);
      return result;
    } catch (e) {
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
      where: 
        (ref: FirebaseCollectionReferenceType)
          => FirebaseQueryType
    ){
    const query = await where(this._ref);
    const data = await this._buildList(query);
    return data;
  }
}