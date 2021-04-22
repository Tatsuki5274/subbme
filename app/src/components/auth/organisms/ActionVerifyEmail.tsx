import { message } from "antd";
import { messageAuth, MessageAuthType } from "common/lang";
import Result500 from "components/common/organisms/500";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import { auth } from "libs/Types";
import { useEffect, useState } from "react";

function useVerify(code: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"SUCCESS" | "FAILD" | null>(null);
  const [error, setError] = useState<MessageAuthType | null>(null);
  useEffect(() => {
    (async () => {
      try {
        await auth.applyActionCode(code);
        // TODO userコレクションのメールアドレスを反映する
        setStatus("SUCCESS");
      } catch (e) {
        setError(e);
        setStatus("FAILD");
      }
    })();
  }, [code]);
  useEffect(() => {
    if (status) {
      setIsLoading(false);
    }
  }, [status]);
  return {
    isLoading,
    status,
    error,
  };
}

export default function ActionVerifyEmail(props: {
  actionCode: string;
  continueUrl: string | null;
  lang: string;
}) {
  const { status, error, isLoading } = useVerify(props.actionCode);
  if (isLoading) return <LoadingScreen />;
  else if (status === "SUCCESS") return <span>success!</span>;
  else if (status === "FAILD") {
    if (error) {
      message.error(messageAuth(error));
    }
    return <span>faild...</span>;
  }
  return <Result500 />;
}
