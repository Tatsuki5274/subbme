import SimpleHeader from "components/common/organisms/SimpleHeader";
import React from "react";
import ActionVerifyEmail from "../organisms/ActionVerifyEmail";

export default function ActionVerifyEmailTemplate(props: {
  actionCode: string;
  continueUrl: string | null;
  lang: string;
}) {
  return (
    <>
      <SimpleHeader />
      <ActionVerifyEmail
        actionCode={props.actionCode}
        continueUrl={props.continueUrl}
        lang={props.lang}
      />
    </>
  );
}
