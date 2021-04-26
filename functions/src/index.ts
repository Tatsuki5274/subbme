import * as admin from "firebase-admin";

admin.initializeApp();
const funcs = {
  onCreateUser: "./functions/onCreateAuth",
  onDeleteUser: "./functions/onDeleteAuth",
  onCreateReport: "./functions/onCreateReport",
  onConfirmEmail: "./functions/onConfirmEmail",
  createContact: "./functions/createContact",
  setSeeds: "./functions/setSeeds",
};

const loadFunctions = (names: {[name:string]: string}) => {
  for (const name in names) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
      module.exports[name] = require(names[name]);
    }
  }
};

loadFunctions(funcs);
