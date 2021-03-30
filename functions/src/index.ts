import * as admin from 'firebase-admin';

admin.initializeApp();
const funcs = {
    onCreateUser: './functions/onCreateAuth.ts',
};

const loadFunctions = (names: any) => {
    for (const name in names) {
        if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
            module.exports[name] = require(names[name]);
        }
    }
};

loadFunctions(funcs);