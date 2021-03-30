import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";

export default functions.auth.user().onCreate(user => {
    // pay.jpの顧客を作成

    // firestoreへユーザー情報を追加
    
    console.log("onCreated", user);
})