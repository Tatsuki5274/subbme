import PSignIn from "components/auth/pages/SignIn";
import PSignUp from "components/auth/pages/SignUp";
import Result404 from "components/common/organisms/404";
import ServiceCreate from "components/service/pages/ServiceCreate";
import ServiceList from "components/service/pages/ServiceList";

//  テストページ
import TestPage from "components/TestPage"; 
import { useUser } from "hooks/UserHooks";
import React, { createContext, useContext } from "react";
import { OmitNative } from "react-router";

import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    RouteProps,
} from "react-router-dom";
import { Path } from "typescript";

const authContext = createContext<boolean>(false);



type ProvideAuthType = {
    children: JSX.Element,
}
function ProvideAuth(props: ProvideAuthType) {
    const { isSignedIn } = useUser();
    return (
      <authContext.Provider value={isSignedIn}>
        {props.children}
      </authContext.Provider>
    );
}

type AuthPropsType = {
    children: JSX.Element,
    rest?: RouteProps
}
function PrivateRoute(props: AuthPropsType & RouteProps) {
    const isSignedIn = useContext(authContext);
    return (
      <Route
        {...props.rest}
        render={({ location }) =>
          isSignedIn ? (
            props.children
          ) : (
            <Redirect
              to={{
                pathname: routeBuilder.signInPath(),
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const Router = () => {
    return (
        <ProvideAuth>
            <BrowserRouter>
                <Switch>
                    <Route exact path={routeBuilder.topPath()} component={ServiceList} />
                    <Route exact path={routeBuilder.signInPath()} component={PSignIn} />
                    <Route exact path={routeBuilder.signUpPath()} component={PSignUp} />
                    <PrivateRoute path={routeBuilder.serviceCreatePath()} >
                        <ServiceCreate />
                    </PrivateRoute>
                    <Route exact path={routeBuilder.serviceListPath()} component={ServiceList} />
                    {/* <Route exact path={routeBuilder.serviceCreatePath()} component={ServiceCreate} /> */}
                    
                    <Route exact path="/test" component={TestPage} />
                    <Result404/>
                    {/* <Redirect to={routeBuilder.topPath()} /> */}
                </Switch>
            </BrowserRouter>
        </ProvideAuth>
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
    },
    serviceCreatePath: (host="") => {
        return `${host}/services/new`;
    },
    serviceListPath: (host="") => {
        return `${host}/services/`;
    },
    serviceEditPath: (serviceID: string, host="") => {
        return `${host}/service/${serviceID}`;
    },
    reportListPath: (host="") => {
        return `${host}/reports/`;
    },
    reportNewPath: (host="") => {
        return `${host}/reports/new`;
    },
    reportDetailPath: (reportID: string, host="") => {
        return `${host}/report/${reportID}`;
    },
    reportEditPath: (reportID: string, host="") => {
        return `${host}/report/${reportID}/edit`;
    },
    settingsPath: (host="") => {
        return `${host}/settings`;
    }
}

export default Router;