import * as functions from "firebase-functions";
import * as Payjp from 'payjp';
// import * as admin from 'firebase-admin';

export default functions.auth.user().onDelete(async (user) => {

    try{
        // pay.jpの顧客を削除
        const sk = functions.config().payjp.sk;
        if (!(typeof sk === "string")) {
            // 秘密鍵がfunctions configに設定されていない場合
            throw new Error("SecretKey is not set");
        }

        const payjp = Payjp(sk);
        const resultPayjp = await payjp.customers.delete(user.uid);
        console.log(JSON.stringify(resultPayjp));
    } catch(e){
        throw new Error(e);
    }
})
