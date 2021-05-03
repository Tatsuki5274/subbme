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
import SettingsHomeLink from "./SettingsHomeLink";
import LoadingScreen from "components/common/organisms/LoadingScreen";

export default function SettingsHome() {
  const { currentUser, isLoading } = useUser();
  const modalPassword = useModal();
  const modalEmail = useModal();

  if (isLoading) return <LoadingScreen />;

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
      <SettingsHomeLink user={currentUser} />
    </>
  );
}

const RowsWrapperStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
  // border-collapse:separate;
});
