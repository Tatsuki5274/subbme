import Title from "components/common/atoms/Title";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import React from "react";
import ActionResetPassword from "../organisms/ActionResetPassword";

export default function MailActionsTemplate(props: {
  actionCode: string;
  continueUrl: string | null;
  lang: string;
}) {
  return (
    <>
      <SimpleHeader />
      <Title>パスワードリセット</Title>
      <ActionResetPassword
        actionCode={props.actionCode}
        continueUrl={props.continueUrl}
        lang={props.lang}
      />
    </>
  );
}
