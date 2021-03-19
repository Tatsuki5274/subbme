import firebase from "libs/Firebase"

export const signUpUser = async(email: string, password: string) => {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return user;
}

export const signInUser = async (email: string, password: string) => {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    return user;
}

export const currentUser = () => {
    return firebase.auth().currentUser;
}