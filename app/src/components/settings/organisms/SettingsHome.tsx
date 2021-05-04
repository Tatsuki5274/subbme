import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import { useModal } from "hooks/CommonHooks";
import styled from "styled-components";
import React from "react";
import { useUser } from "hooks/UserHooks";
import SettingsUpdateEmail from "./SettingsUpdateEmail";
import SettingsUpdatePassword from "./SettingsUpdatePassword";
import SettingsHomeLink from "./SettingsHomeLink";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import { Alert, Button } from "antd";
import SettingsHomeRemove from "./SettingsHomeRemove";

export default function SettingsHome() {
  const { currentUser, isLoading } = useUser();
  const modalPassword = useModal();
  const modalEmail = useModal();
  const modalRemove = useModal();

  if (isLoading) return <LoadingScreen />;
  else if (!currentUser) {
    throw new Error("User not signedin");
  }
  const passwordProvider =
    currentUser.providerData.find((provider) => {
      return provider?.providerId === "password";
    }) || null;
  return (
    <>
      <Title>設定</Title>
      <SubTitle>認証情報</SubTitle>
      {!passwordProvider ? (
        <Alert
          message="情報の変更について"
          description="Emailアカウントを設定していない場合はメールアドレスとパスワードを変更することができません。通知先の変更などでメールアドレスを変更する必要がある場合はEmailアカウントの設定を行ってください。"
          type="info"
          showIcon
        />
      ) : null}
      <SeparatedTableStyle>
        <tr>
          <td>
            {passwordProvider ? (
              <Button type="primary" onClick={modalEmail.handleOpen}>
                変更
              </Button>
            ) : (
              <Button type="primary" disabled>
                変更
              </Button>
            )}
          </td>
          <td>メールアドレス</td>
          <td>{`${currentUser?.email || ""}(${
            currentUser?.emailVerified ? "確認済み" : "未確認"
          })`}</td>
        </tr>
        <tr>
          <td>
            {passwordProvider ? (
              <Button type="primary" onClick={modalPassword.handleOpen}>
                変更
              </Button>
            ) : (
              <Button type="primary" disabled>
                変更
              </Button>
            )}
          </td>
          <td>パスワード</td>
          <td>********</td>
        </tr>
      </SeparatedTableStyle>

      <SettingsHomeLink user={currentUser} />
      <Button type="primary" danger onClick={modalRemove.handleOpen}>
        退会
      </Button>
      <div>
        {/* モーダルコンテンツ */}
        <SettingsUpdatePassword
          visible={modalPassword.isVisible}
          handleClose={modalPassword.handleClose}
        />
        <SettingsUpdateEmail
          visible={modalEmail.isVisible}
          handleClose={modalEmail.handleClose}
        />
        <SettingsHomeRemove
          user={currentUser}
          visible={modalRemove.isVisible}
          handleClose={modalRemove.handleClose}
        />
      </div>
    </>
  );
}

const SeparatedTableStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
  // border-collapse:separate;
});
