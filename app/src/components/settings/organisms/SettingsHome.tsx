import SubTitle from "components/common/atoms/SubTitle";
import React, { useEffect, useState } from "react";
import { useUser } from "hooks/UserHooks";
import SettingsHomeLink from "./SettingsHomeLink";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import firebase from "libs/Firebase";
import SettingsHomeAuthPassword from "./SettingsHomeAuthPassword";
import SettingsHomeAuthPasswordless from "./SettingsHomeAuthPasswordless";
import SettingsHomeAuthOauth from "./SettingsHomeAuthOauth";
import SettingsHomeDelete from "./SettingsHomeDelete";
import Title from "components/common/atoms/Title";

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

export const resendEmailVerification = async (user: firebase.User) => {
  await user.sendEmailVerification();
};

export default function SettingsHome() {
  const {
    currentUser,
    isLoading,
    isProviderEmailLink,
    isProviderPassword,
    isProviderGoogle,
  } = useUserSetting();

  if (isLoading) return <LoadingScreen />;
  else if (!currentUser) {
    throw new Error("User not signedin");
  }
  const AuthInfo = () => {
    // 認証プロバイダーによってアカウントの認証情報表示を分ける
    if (isProviderPassword) {
      return <SettingsHomeAuthPassword user={currentUser} />;
    } else if (isProviderEmailLink) {
      return <SettingsHomeAuthPasswordless user={currentUser} />;
    } else if (isProviderGoogle) {
      return <SettingsHomeAuthOauth user={currentUser} />;
    } else throw new Error("Provider is not match.");
  };

  return (
    <>
      <Title>設定</Title>
      <SubTitle>認証情報</SubTitle>
      <AuthInfo />
      <SubTitle>アカウント連携</SubTitle>
      <SettingsHomeLink
        user={currentUser}
        isProviderEmailLink={isProviderEmailLink}
        isProviderGoogle={isProviderGoogle}
        isProviderPassword={isProviderPassword}
      />
      <SubTitle>アカウント削除</SubTitle>
      <SettingsHomeDelete user={currentUser} />
    </>
  );
}
