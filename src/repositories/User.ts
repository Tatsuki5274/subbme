import Firebase from "libs/Firebase"

export const createUser = async(email: string, password: string) => {
    const user = await Firebase.auth().createUserWithEmailAndPassword(email, password);
    return user;
}