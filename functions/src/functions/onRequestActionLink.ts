import * as functions from "firebase-functions";

export default functions
.region("asia-northeast1")
.https
.onRequest((req, res) => {
  const method = req.method;
  console.log("method", method);
  console.log("params", req.query);
  console.log("mode", req.query.mode);
  console.log("oobCode", req.query.oobCode);
  res.send({message: "OK", params: req.query});
});

