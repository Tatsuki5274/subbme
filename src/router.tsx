import PSignIn from "components/auth/pages/SignIn";
import PSignUp from "components/auth/pages/SignUp";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={routeBuilder.topPath()} component={PSignIn} />
                <Route exact path={routeBuilder.signInPath()} component={PSignIn} />
                <Route exact path={routeBuilder.signUpPath()} component={PSignUp} />
                <Redirect to={routeBuilder.topPath()} />
            </Switch>
        </BrowserRouter>
    );
}

export const routeBuilder = {
    topPath: (host="") => {
        return `${host}/`;
    },
    signInPath: (host="") => {
        return `${host}/signin`;
    },
    signUpPath: (host="") => {
        return `${host}/signup`;
    }
}

export default Router;