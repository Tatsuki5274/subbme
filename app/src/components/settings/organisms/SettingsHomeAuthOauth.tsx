import { Alert, Button } from "antd";
import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import React from "react";
import styled from "styled-components";
import firebase from "libs/Firebase";

export default function SettingsHomeAuthOauth(props: { user: firebase.User }) {
  return (
    <>
      <Title>設定</Title>
      <SubTitle>認証情報</SubTitle>
      <Alert
        message="情報の変更について"
        description="Emailアカウントを設定していない場合はメールアドレスとパスワードを変更することができません。通知先の変更などでメールアドレスを変更する必要がある場合はEmailアカウントの設定を行ってください。"
        type="info"
        showIcon
      />
      <SeparatedTableStyle>
        <tr>
          <td>
            <Button type="primary" disabled>
              変更
            </Button>
          </td>
          <td>メールアドレス</td>
          <td>{`${props.user.email || ""}(${
            props.user.emailVerified ? "確認済み" : "未確認"
          })`}</td>
        </tr>
        <tr>
          <td>
            <Button type="primary" disabled>
              変更
            </Button>
          </td>
          <td>パスワード</td>
          <td>********</td>
        </tr>
      </SeparatedTableStyle>
    </>
  );
}

const SeparatedTableStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
  // border-collapse:separate;
});
