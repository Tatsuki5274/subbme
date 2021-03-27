import { Link } from "react-router-dom";
import { routeBuilder } from "router";

export default function SignInNewUser(){
    return <span>
        初めてのご利用の方は
        <Link to={routeBuilder.signUpPath()}>こちら</Link>
    </span>;
}