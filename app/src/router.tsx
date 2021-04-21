import MailActions from "components/auth/pages/MailActions";
import ResetPassword from "components/auth/pages/ResetPassword";
import PSignIn from "components/auth/pages/SignIn";
import PSignUp from "components/auth/pages/SignUp";
import Result404 from "components/common/organisms/404";
import ReportDetail from "components/report/pages/ReportDetail";
import ReportList from "components/report/pages/ReportList";
import ReportNew from "components/report/pages/ReportNew";
import ServiceCreate from "components/service/pages/ServiceCreate";
import ServiceDetail from "components/service/pages/ServiceDetail";
import ServiceEdit from "components/service/pages/ServiceEdit";
import ServiceList from "components/service/pages/ServiceList";
import Settings from "components/settings/pages/Settings";

//  テストページ
import TestPage from "components/TestPage";
import { useUser } from "hooks/UserHooks";
import { createContext } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

export const authContext = createContext<boolean | null>(null);

type ProvideAuthType = {
  children: JSX.Element;
};
function ProvideAuth(props: ProvideAuthType) {
  const { isSignedIn } = useUser();
  return (
    <authContext.Provider value={isSignedIn}>
      {props.children}
    </authContext.Provider>
  );
}

const Router = () => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          {/* トップ画面 */}
          <Route exact path={routeBuilder.topPath()} component={ServiceList} />
          <Route exact path={routeBuilder.signInPath()} component={PSignIn} />
          <Route exact path={routeBuilder.signUpPath()} component={PSignUp} />
          <Route
            exact
            path={routeBuilder.resetPasword()}
            component={ResetPassword}
          />

          {/* サービス関係 */}
          <Route
            exact
            path={routeBuilder.serviceCreatePath()}
            component={ServiceCreate}
          />
          <Route
            exact
            path={routeBuilder.serviceListPath()}
            component={ServiceList}
          />
          <Route
            exact
            path={routeBuilder.serviceEditPath(":serviceID")}
            component={ServiceEdit}
          />
          <Route
            exact
            path={routeBuilder.serviceDetailPath(":serviceID")}
            component={ServiceDetail}
          />

          {/* 分析関係 */}
          <Route
            exact
            path={routeBuilder.reportListPath()}
            component={ReportList}
          />
          <Route
            exact
            path={routeBuilder.reportNewPath()}
            component={ReportNew}
          />
          <Route
            exact
            path={routeBuilder.reportDetailPath(":reportID")}
            component={ReportDetail}
          />

          {/* 設定関係 */}
          <Route
            exact
            path={routeBuilder.settingsPath()}
            component={Settings}
          />

          <Route
            exact
            path={routeBuilder.settingsActionLinkPath()}
            component={MailActions}
          />

          <Route exact path="/test" component={TestPage} />
          <Result404 />
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
};

export const routeBuilder = {
  topPath: (host = "") => {
    return `${host}/`;
  },
  signInPath: (host = "") => {
    return `${host}/signin`;
  },
  signUpPath: (host = "") => {
    return `${host}/signup`;
  },
  resetPasword: (host = "") => {
    return `${host}/resetpassword`;
  },
  serviceCreatePath: (host = "") => {
    return `${host}/services/new`;
  },
  serviceListPath: (host = "") => {
    return `${host}/services/`;
  },
  serviceDetailPath: (serviceID: string, host = "") => {
    return `${host}/service/${serviceID}`;
  },
  serviceEditPath: (serviceID: string, host = "") => {
    return `${host}/service/${serviceID}/edit`;
  },
  reportListPath: (host = "") => {
    return `${host}/reports/`;
  },
  reportNewPath: (host = "") => {
    return `${host}/reports/new`;
  },
  reportDetailPath: (reportID: string, host = "") => {
    return `${host}/report/${reportID}`;
  },
  reportEditPath: (reportID: string, host = "") => {
    return `${host}/report/${reportID}/edit`;
  },
  settingsPath: (host = "") => {
    return `${host}/settings`;
  },
  settingsActionLinkPath: (host = "") => {
    return `${host}/actions`;
  },
  settingMailPath: (host = "") => {
    return `${host}/settings/mail`;
  },
  settingsPasswordPath: (host = "") => {
    return `${host}/settings/password`;
  },
};

export default Router;
