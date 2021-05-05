import { Tabs } from "antd";
import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import { useUser } from "hooks/UserHooks";
import React from "react";
import { Redirect } from "react-router";
import { routeBuilder } from "router";
import SignInServices from "../organisms/SignInServices";
import OSignUpForm from "../organisms/SignUpForm";
import SignUpPasswordlessForm from "../organisms/SignUpPasswordlessForm";
import SignUpRegistUser from "../organisms/SignUpRegistUser";

const { TabPane } = Tabs;

export default function SignUp() {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return <Redirect to={routeBuilder.topPath()} />;
  }

  return (
    <>
      <SimpleHeader />
      <Title>新規登録</Title>
      <SubTitle>メールアドレスで登録</SubTitle>
      <Tabs defaultActiveKey="1">
        <TabPane tab="パスワードレス(推奨)" key="1">
          <SignUpPasswordlessForm />
        </TabPane>
        <TabPane tab="パスワード" key="2">
          <OSignUpForm />
        </TabPane>
      </Tabs>
      <SignUpRegistUser />
      <SubTitle>サービスでログイン</SubTitle>
      <SignInServices />
    </>
  );
}
