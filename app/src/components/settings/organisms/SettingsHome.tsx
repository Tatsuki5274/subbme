import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import { useModal } from "hooks/CommonHooks";
import styled from "styled-components";
import SettingsRow from "../molecules/SettingsRow";
import { Button } from "antd";
import React from "react";
import { useUser } from "hooks/UserHooks";
import SettingsUpdateEmail from "./SettingsUpdateEmail";
import SettingsUpdatePassword from "./SettingsUpdatePassword";

export default function SettingsHome() {
  const { currentUser } = useUser();
  const modalPassword = useModal();
  const modalEmail = useModal();
  // email / password の認証に関する情報
  const passwordProvider = currentUser?.providerData.find((provider) => {
    return provider?.providerId === "password";
  });
  // google 認証に関する情報
  const googleProvider = currentUser?.providerData.find((provider) => {
    return provider?.providerId === "google.com";
  });
  return (
    <>
      <Title>設定</Title>
      <SubTitle>認証情報</SubTitle>
      <RowsWrapperStyle>
        <SettingsRow
          label="メールアドレス"
          value={`${currentUser?.email || ""}(${
            currentUser?.emailVerified ? "確認済み" : "未確認"
          })`}
          onClick={modalEmail.handleOpen}
        />
        <SettingsRow
          onClick={modalPassword.handleOpen}
          label="パスワード"
          value="********"
        />
      </RowsWrapperStyle>
      <div>
        <SettingsUpdatePassword
          visible={modalPassword.isVisible}
          handleClose={modalPassword.handleClose}
        />
        <SettingsUpdateEmail
          visible={modalEmail.isVisible}
          handleClose={modalEmail.handleClose}
        />
      </div>
      <SubTitle>アカウント連携</SubTitle>
      <div>
        {passwordProvider ? "連携済み" : <Button type="primary">連携</Button>}{" "}
        メールアドレス/パスワード認証{" "}
      </div>
    </>
  );
}

const RowsWrapperStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
  // border-collapse:separate;
});
