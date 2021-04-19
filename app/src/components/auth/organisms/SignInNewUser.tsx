import { Link } from "react-router-dom";
import { routeBuilder } from "router";

export default function SignInNewUser() {
  return (
    <>
      <div>
        初めてのご利用の方は
        <Link to={routeBuilder.signUpPath()}>こちら</Link>
      </div>
      <div>
        パスワードを忘れた方は
        <Link to={routeBuilder.resetPasword()}>こちら</Link>
      </div>
    </>
  );
}
