import LoadingScreen from "components/common/organisms/LoadingScreen";
import React, { useContext } from "react";
import { Redirect } from "react-router";
import { authContext, routeBuilder } from "router";

type PropsType = {
    children: JSX.Element
}

export default function PrivateRoute(props: PropsType) {
    const isSignedIn = useContext(authContext);
    if (isSignedIn === null) {
        return <LoadingScreen />
    } else if (isSignedIn === false){
        return (
            <Redirect
                to={{
                    pathname: routeBuilder.signInPath(),
                    // state: { from: location }
                }}
            />
        )
    }

    return props.children;
}