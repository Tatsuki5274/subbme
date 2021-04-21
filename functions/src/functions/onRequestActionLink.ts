import * as functions from "firebase-functions";

export default functions
.region("asia-northeast1")
.https
.onRequest((req, res) => {
  console.log(JSON.stringify(req));
  res.send({message: "OK"});
});