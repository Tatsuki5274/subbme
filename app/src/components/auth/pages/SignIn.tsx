import { Tabs } from "antd";
import Title from "components/common/atoms/Title";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import { useUser } from "hooks/UserHooks";
import React from "react";
import { Redirect } from "react-router";
import { routeBuilder } from "router";
import styled from "styled-components";
import OSignInForm from "../organisms/SignInForm";
import SignInNewUser from "../organisms/SignInNewUser";
import SignInPasswordlessForm from "../organisms/SignInPasswordlessForm";
import SignInServices from "../organisms/SignInServices";

const { TabPane } = Tabs;

export default function SignIn() {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return <Redirect to={routeBuilder.topPath()} />;
  }

  return (
    <>
      <SimpleHeader />
      <Title>ログイン</Title>
      <SubTitle>メールアドレスでログイン</SubTitle>
      <Tabs defaultActiveKey="1">
        <TabPane tab="パスワードレス(推奨)" key="1">
          <SignInPasswordlessForm />
        </TabPane>
        <TabPane tab="パスワード" key="2">
          <OSignInForm />
        </TabPane>
      </Tabs>
      <SignInNewUser />
      <SubTitle>サービスでログイン</SubTitle>
      <SignInServices />
      {/* <Footer /> */}
    </>
  );
}

const SubTitle = styled.div({
  fontSize: "26px",
  color: "#868E96",
});
