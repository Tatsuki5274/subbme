// import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import { UserManager } from '../repositories/Users';
import * as Payjp from 'payjp';
import * as admin from 'firebase-admin';

export default functions.auth.user().onCreate(async user => {
    try{
        // pay.jpの顧客を作成
        const sk = functions.config().payjp.sk;
        if (!(typeof sk === "string")) {
            // 秘密鍵がfunctions configに設定されていない場合
            throw new Error("SecretKey is not set");
        }

        const payjp = Payjp(sk);
        await payjp.customers.create({
            id: user.uid,
        }).then(charge => {
            console.log(JSON.stringify(charge));
        }).catch((e: Payjp.ResponseError) => {
            e.response?.body
            throw new Error(e.message);
        });

        // firestoreへユーザー情報を追加
        const userManager = new UserManager();
        await userManager.set({
            uid: user.uid
        })

        await admin.auth().setCustomUserClaims(user.uid, {
            plan: "free",
        })
        return user.uid;

    } catch(e) {
        console.error(e);
        throw new Error(e);
    }
})