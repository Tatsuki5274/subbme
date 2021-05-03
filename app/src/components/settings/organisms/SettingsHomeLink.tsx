import { Button } from "antd";
import SubTitle from "components/common/atoms/SubTitle";
import { useUser } from "hooks/UserHooks";
import React from "react";
import firebase from "libs/Firebase";
import styled from "styled-components";

export default function SettingsHomeLink(props: {
  user: firebase.User | null;
}) {
  // email / password の認証に関する情報
  const passwordProvider = props.user?.providerData.find((provider) => {
    return provider?.providerId === "password";
  });
  // google 認証に関する情報
  const googleProvider = props.user?.providerData.find((provider) => {
    return provider?.providerId === "google.com";
  });
  return (
    <>
      <SubTitle>アカウント連携</SubTitle>
      <table>
        <tr>
          <td>
            {passwordProvider ? (
              "連携済み"
            ) : (
              <Button type="primary">連携</Button>
            )}
          </td>
          <td>メールアドレス/パスワード認証</td>
        </tr>
        <tr>
          <td>
            {googleProvider ? "連携済み" : <Button type="primary">連携</Button>}
          </td>
          <td>Googleアカウント</td>
        </tr>
      </table>
    </>
  );
}
