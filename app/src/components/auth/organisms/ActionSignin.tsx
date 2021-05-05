import { MessageAuthType } from "common/lang";
import { useEffect, useState } from "react";
import { auth } from "libs/Types";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import { message } from "antd";

function useVerify(code: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<MessageAuthType | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          // ログインリクエストを送信した環境と別環境の場合。
          // フロントでメールアドレスのみ入力させても良さそう
          throw new Error(
            "Email is not stored in the localStorage. Check your browser is same sent."
          );
        }
        const res = await auth.checkActionCode(code);
        if (res.operation !== "EMAIL_SIGNIN") {
          // 操作が異なる場合。通常発生することはない
          throw new Error("Operation is not sigin");
        }

        await auth.signInWithEmailLink(email, window.location.href);
        window.localStorage.removeItem("emailForSignIn");
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    })();
  }, [code]);
  return {
    isLoading,
    status,
    error,
  };
}

export default function ActionSignin(props: {
  actionCode: string;
  continueUrl: string | null;
  lang: string;
}) {
  const { isLoading, error } = useVerify(props.actionCode);
  const history = useHistory();
  if (isLoading) {
    return <LoadingScreen />;
  } else if (!error) {
    message.success("ログインに成功しました");
    if (props.continueUrl) {
      const uri = new URL(props.continueUrl);
      history.push(uri.pathname + uri.search);
    } else {
      history.push(routeBuilder.topPath());
    }
  } else {
    return (
      <>
        <p>ログインにエラーが発生しました。再度お試しください。</p>
        <p>{error?.message}</p>
      </>
    );
  }
  return <p>完了</p>;
}
