import SimpleHeader from "components/common/organisms/SimpleHeader";
import React from "react";
import ActionRecoverEmail from "../organisms/ActionRecoverEmail";

export default function ActionRecoverEmailTemplate(props: {
  actionCode: string;
  lang: string;
}) {
  return (
    <>
      <SimpleHeader />
      <ActionRecoverEmail actionCode={props.actionCode} lang={props.lang} />
    </>
  );
}
