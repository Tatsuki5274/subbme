import firebase from "libs/Firebase"
import ServiceGoogle from "../molecules/ServiceGoogle";

export default function SignInServices(){
    const google = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().useDeviceLanguage();

        firebase.auth().signInWithPopup(provider)
            .then(value => {
                console.log(value);
            })
            .catch(reason => {
                console.error(reason)
            })
    }
    return (
        <div>
            <ServiceGoogle
                onClick={google}
            />
        </div>
    );
}