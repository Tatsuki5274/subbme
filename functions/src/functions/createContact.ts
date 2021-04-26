import * as functions from "firebase-functions";
import admin from "../libs/Firebase";

const fn = async (data: any, context: any) => {
  return { message: "success" };
}

const httpEvent = functions.region("us-central1").https.onCall(fn);
export {httpEvent};
