// import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import { UserManager } from '../repositories/Users';

export default functions.auth.user().onCreate(async user => {
    // pay.jpの顧客を作成

    // firestoreへユーザー情報を追加
    
    console.log("onCreated", user.uid);

    const userManager = new UserManager();
    const result = await userManager.add({
        uid: user.uid
    })
    return result;
})