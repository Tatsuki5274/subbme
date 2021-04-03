// import { Service } from "entities/Service";
// import Result500 from "./common/organisms/500";

export default function TestPage() {
    return null;
    // try{
    //     const user = currentUser();
    //     console.log(user)
    //     // throw new Error("テストエラー")
    //     return (
    //         <div>
    //             <button
    //                 onClick={()=>{
    //                     const mock: Service = {
    //                         userID: "tatsuki",
    //                         // unit: "USD"
    //                     }
    //                     addService(mock);
    //                 }}
    //             >登録テスト</button>
    //             <button
    //                 onClick={ async()=>{
    //                     const uid = currentUser()?.uid;
    //                     if(uid){
    //                         const ref = getServiceRef().where("userID", "==", "tatsuki");
    //                         const data = await listService(ref);
    //                         console.log(data);
    //                     }
    //                 }}
    //             >取得</button>
    //         </div>
    //     )
    // }catch(e){
    //     return <Result500 error={e} />
    // }
}