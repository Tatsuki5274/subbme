import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import { useModal } from "hooks/CommonHooks";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useUser } from "hooks/UserHooks";
import SettingsUpdateEmail from "./SettingsUpdateEmail";
import SettingsUpdatePassword from "./SettingsUpdatePassword";
import SettingsHomeLink from "./SettingsHomeLink";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import { Alert, Button } from "antd";
import SettingsHomeRemove from "./SettingsHomeRemove";
import firebase from "libs/Firebase";
import SettingsHomeAuthPassword from "./SettingsHomeAuthPassword";
import SettingsHomeAuthPasswordless from "./SettingsHomeAuthPasswordless";
import SettingsHomeAuthOauth from "./SettingsHomeAuthOauth";

const useUserSetting = () => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isProviderEmailLink, setIsProviderEmailLink] = useState(false);
  const [isProviderPassword, setIsProviderPassword] = useState(false);
  const [isProviderGoogle, setIsProviderGoogle] = useState(false);
  const [isLoadingPasswordProvider, setIsLoadingPasswordProvider] = useState(
    true
  );
  const [isLoadingOauthProvider, setIsLoadingOauthProvider] = useState(true);
  useEffect(() => {
    // アカウントがemail linkかemail passwordか判断
    if (user.currentUser?.email) {
      firebase
        .auth()
        .fetchSignInMethodsForEmail(user.currentUser.email)
        .then((signInMethods) => {
          if (
            signInMethods.indexOf(
              firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
            ) != -1
          ) {
            setIsProviderPassword(true);
          }
          if (
            signInMethods.indexOf(
              firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
            ) != -1
          ) {
            setIsProviderEmailLink(true);
          }
        })
        .then(() => {
          // passwordプロバイダーのロードが完了
          setIsLoadingPasswordProvider(false);
        });
    }
  }, [user.currentUser]);
  useEffect(() => {
    // Googleプロバイダーを使っているか確認
    if (!user.isLoading) {
      const googleProvider =
        user.currentUser?.providerData.find((provider) => {
          return provider?.providerId === "google.com";
        }) || null;
      setIsProviderGoogle(googleProvider !== null);
      setIsLoadingOauthProvider(false);
    }
  }, [user]);
  useEffect(() => {
    // 両方のロードが完了した場合、ロード完了(false)を返す。
    setIsLoading(
      !(isLoadingPasswordProvider === false && isLoadingOauthProvider === false)
    );
  }, [isLoadingOauthProvider, isLoadingPasswordProvider]);
  return {
    currentUser: user.currentUser,
    isLoading,
    isProviderEmailLink,
    isProviderPassword,
    isProviderGoogle,
  };
};

export default function SettingsHome() {
  const {
    currentUser,
    isLoading,
    isProviderEmailLink,
    isProviderPassword,
    isProviderGoogle,
  } = useUserSetting();
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
      {isProviderPassword ? (
        <SettingsHomeAuthPassword user={currentUser} />
      ) : null}
      {isProviderEmailLink ? (
        <SettingsHomeAuthPasswordless user={currentUser} />
      ) : null}
      {isProviderGoogle ? <SettingsHomeAuthOauth user={currentUser} /> : null}
      <SettingsHomeLink user={currentUser} />
      <SubTitle>アカウント削除</SubTitle>
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
