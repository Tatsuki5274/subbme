import React from "react";
import PrivacyPolicyTemplate from "components/privacyPolicy/templates/PrivacyPolicyTemplate";
import { Helmet } from "react-helmet";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <html lang="ja" />
        <title>Top | Privacy Policy</title>
        <meta name="description" content="プライバシーポリシ" />
      </Helmet>
      <PrivacyPolicyTemplate />
    </>
  );
}
