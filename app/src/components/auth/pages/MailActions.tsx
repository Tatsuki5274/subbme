import Result404 from "components/common/organisms/404";
import { useQuery } from "hooks/CommonHooks";
import React from "react";
import ActionSignin from "../organisms/ActionSignin";
import ActionRecoverEmailTemplate from "../templates/ActionRecoverEmailTemplate";
import ActionResetPasswordTemplate from "../templates/ActionResetPasswordTemplate";
import ActionVerifyEmailTemplate from "../templates/ActionVerifyEmailTemplate";

export default function MailActions() {
  const query = useQuery();
  const mode = query.get("mode");
  const actionCode = query.get("oobCode");
  const continueUrl = query.get("continueUrl");
  const lang = query.get("lang") || "ja";
  if (!mode || !actionCode) {
    // パラメータに必要な情報が含まれていない場合は404を返す
    return <Result404 />;
  }
  switch (mode) {
    case "resetPassword":
      // Display reset password handler and UI.
      return (
        <ActionResetPasswordTemplate
          actionCode={actionCode}
          continueUrl={continueUrl}
          lang={lang}
        />
      );
    case "recoverEmail":
      // Display email recovery handler and UI.
      return <ActionRecoverEmailTemplate actionCode={actionCode} lang={lang} />;
    case "verifyEmail":
      // Display email verification handler and UI.
      return (
        <ActionVerifyEmailTemplate
          actionCode={actionCode}
          continueUrl={continueUrl}
          lang={lang}
        />
      );
    case "signIn":
      return (
        <ActionSignin
          actionCode={actionCode}
          continueUrl={continueUrl}
          lang={lang}
        />
      );
    default:
      // Error: invalid mode.
      return <Result404 />;
  }
}
