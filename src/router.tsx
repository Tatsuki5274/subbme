import PSignIn from "components/auth/pages/PSignIn";
import PSignUp from "components/auth/pages/PSignUp";
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
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
    topPath: (host?: string) => {
        return `${host || ""}/`;
    },
    signInPath: (host?: string) => {
        return `${host || ""}/signin`;
    },
    signUpPath: (host?: string) => {
        return `${host || ""}/signup`;
    }
}

export default Router;