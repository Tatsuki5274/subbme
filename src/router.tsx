import PSignIn from "components/auth/pages/SignIn";
import PSignUp from "components/auth/pages/SignUp";
import Result404 from "components/common/organisms/404";

//  テストページ
import TestPage from "components/TestPage"; 
import React from "react";

import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={routeBuilder.topPath()} component={TestPage} />
                <Route exact path={routeBuilder.signInPath()} component={PSignIn} />
                <Route exact path={routeBuilder.signUpPath()} component={PSignUp} />
                <Result404/>
                {/* <Redirect to={routeBuilder.topPath()} /> */}
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