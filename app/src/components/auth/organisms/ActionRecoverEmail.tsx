import { message } from "antd";
import { messageAuth } from "common/lang";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import { auth } from "libs/Types";
import { useEffect, useState } from "react";

function useRecover(code: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [error, setError] = useState<any>(undefined);
  useEffect(() => {
    (async () => {
      try {
        let restoredEmail: string | null = null;
        const resultCheck = await auth.checkActionCode(code);
        restoredEmail = resultCheck.data.email || null;
        if (!restoredEmail) {
          // コードが無効
          throw new Error("invalid code");
        }
        // メールアドレスの変更取り消しを確定
        await auth.applyActionCode(code);
        // 取り消したメールアドレスへパスワードリセットメールを送信
        await auth.sendPasswordResetEmail(restoredEmail);
        setErrorMessage(null);
      } catch (e) {
        const message = messageAuth(e);
        setErrorMessage(message);
      } finally {
        // 処理完了を知らせる
        setIsLoading(false);
      }
    })();
  }, []);
  return {
    isLoading,
    errorMessage,
  };
}

export default function ActionRecoverEmail(props: {
  actionCode: string;
  lang: string;
}) {
  const { isLoading, errorMessage } = useRecover(props.actionCode);
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (errorMessage) {
    message.error(errorMessage);
    return <span>エラーが発生しました</span>;
  }
  return <span>正常に完了しました</span>;
}
