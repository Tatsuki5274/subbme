import { Alert, Button } from "antd";
import React from "react";
import styled from "styled-components";
import firebase from "libs/Firebase";
import { resendEmailVerification } from "./SettingsHome";
import AsyncButton from "components/common/atoms/AsyncButton";

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
            <div>
              {props.user.email || ""}
              {props.user.emailVerified ? (
                <span>確認済み</span>
              ) : (
                <AsyncButton
                  type="link"
                  onClick={async () =>
                    await resendEmailVerification(props.user)
                  }
                >
                  確認メール再送信
                </AsyncButton>
              )}
            </div>
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
