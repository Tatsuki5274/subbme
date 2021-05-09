import { Alert, Button } from "antd";
import React from "react";
import styled from "styled-components";
import firebase from "libs/Firebase";

export default function SettingsHomeAuthOauth(props: { user: firebase.User }) {
  return (
    <>
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
          <td>
            <div>メールアドレス</div>
            <div>{`${props.user.email || ""}(${
              props.user.emailVerified ? "確認済み" : "未確認"
            })`}</div>
          </td>
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
