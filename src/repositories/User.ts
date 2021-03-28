import firebase from "libs/Firebase"
type ErrorType = {
    code: string,
    message: string
}

export const signUpUser = async(email: string, password: string) => {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return user;
}

export const signInUser = async (email: string, password: string) => {
    try{
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        return user;
    }catch(e){
        return {
            code: e.code,
            message: e.message
        } as ErrorType
    }
}

/**
 * @deprecated
 */
export function currentUser(){
    return firebase.auth().currentUser;
}

/**
 * @deprecated
 */
export const isSignedIn = () => {
    return currentUser() ? true : false;
}