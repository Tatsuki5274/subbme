import SubTitle from "components/common/atoms/SubTitle";
import React from "react";
import firebase from "libs/Firebase";
import styled from "styled-components";
import AsyncButton from "components/common/atoms/AsyncButton";
import { message } from "antd";
import { messageAuth } from "common/lang";

export default function SettingsHomeLink(props: {
  user: firebase.User | null;
}) {
  const user = props.user;
  if (!user) {
    return null;
  }
  // google 認証に関する情報
  const googleProvider = props.user?.providerData.find((provider) => {
    return provider?.providerId === "google.com";
  });
  const onClickGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await user.linkWithPopup(provider);
      message.success("連携に成功しました");
    } catch (e) {
      message.error(messageAuth(e));
    }
  };
  return (
    <>
      <SubTitle>アカウント連携</SubTitle>
      <table>
        {/* <tr>
          <td>
            {passwordProvider ? (
              "連携済み"
            ) : (
              <AsyncButton type="primary" onClick={onClickPassword}>
                連携
              </AsyncButton>
            )}
          </td>
          <td>メールアドレス/パスワード認証</td>
        </tr> */}
        <tr>
          <td>
            {googleProvider ? (
              "連携済み"
            ) : (
              <AsyncButton type="primary" onClick={onClickGoogle}>
                連携
              </AsyncButton>
            )}
          </td>
          <td>Googleアカウント</td>
        </tr>
      </table>
    </>
  );
}
