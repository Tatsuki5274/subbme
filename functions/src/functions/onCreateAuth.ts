// import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import { UserManager } from '../repositories/Users';

export default functions.auth.user().onCreate(user => {
    // pay.jpの顧客を作成

    // firestoreへユーザー情報を追加
    
    console.log("onCreated", user.uid);

    const userManager = new UserManager();
    userManager.add({
        uid: user.uid
    })
})