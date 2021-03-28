import { message } from "antd";
import firebase from "libs/Firebase"
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import ServiceGoogle from "../molecules/ServiceGoogle";

export default function SignInServices(){
    const history = useHistory();
    const google = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().useDeviceLanguage();

        firebase.auth().signInWithPopup(provider)
            .then(value => {
                message.success("ログインに成功しました")
                history.push(routeBuilder.topPath());
            })
            .catch(reason => {
                message.error("ログインに失敗しました");
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