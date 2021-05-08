import { Alert, Tabs } from "antd";
import Title from "components/common/atoms/Title";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import { useUser } from "hooks/UserHooks";
import React from "react";
import { Redirect } from "react-router";
import { routeBuilder } from "router";
import styled from "styled-components";
import OSignInForm from "../organisms/SignInForm";
import OSignUpForm from "../organisms/SignUpForm";
import SignInPasswordlessForm from "../organisms/SignInPasswordlessForm";
import SignInServices from "../organisms/SignInServices";
import SignInForgetPassword from "../organisms/SignInForgetPassword";

const { TabPane } = Tabs;

export default function SignIn() {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return <Redirect to={routeBuilder.topPath()} />;
  }

  return (
    <>
      <SimpleHeader />
      <Title>ログイン・新規登録</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="安全な認証(推奨)" key="1">
          <Tabs defaultActiveKey="1">
            <TabPane tab="パスワードレス認証(推奨)" key="1">
              <SubTitle>パスワードレス認証</SubTitle>
              <SignInPasswordlessForm />
            </TabPane>
            <TabPane tab="サービス認証" key="2">
              <SubTitle>サービス認証</SubTitle>
              <SignInServices />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="一般的な認証" key="2">
          <Tabs defaultActiveKey="1">
            <TabPane tab="ログイン" key="1">
              <OSignInForm />
              <SignInForgetPassword />
            </TabPane>
            <TabPane tab="新規登録" key="2">
              <Alert
                message="セキュリティ警告"
                description="パスワードによる認証は推奨されません。リスクを理解している上で適切な管理ができる場合のみご利用ください。"
                type="warning"
                showIcon
                closable
              />
              <OSignUpForm />
            </TabPane>
          </Tabs>
        </TabPane>
        {/* <TabPane tab="パスワードレス" key="3">
          <SignInPasswordlessForm />
        </TabPane>
        <TabPane tab="パスワード" key="4">
          <OSignInForm />
        </TabPane> */}
      </Tabs>
      {/* <Footer /> */}
    </>
  );
}

const SubTitle = styled.div({
  fontSize: "26px",
  color: "#868E96",
});
