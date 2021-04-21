import Result500 from "components/common/organisms/500";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import { auth } from "libs/Types";
import { useEffect, useState } from "react";

function useVerify(code: string) {
  const [status, setStatus] = useState<"SUCCESS" | "FAILD" | "LOADING">(
    "LOADING"
  );
  useEffect(() => {
    (async () => {
      try {
        await auth.applyActionCode(code);
        setStatus("SUCCESS");
      } catch (e) {
        setStatus("FAILD");
      }
    })();
  }, [code]);
  return {
    status,
  };
}

export default function ActionVerifyEmail(props: {
  actionCode: string;
  continueUrl: string | null;
  lang: string;
}) {
  const { status } = useVerify(props.actionCode);
  if (status === "LOADING") return <LoadingScreen />;
  else if (status === "SUCCESS") return <span>success!</span>;
  else if (status === "FAILD") return <span>faild...</span>;
  return <Result500 />;
}
