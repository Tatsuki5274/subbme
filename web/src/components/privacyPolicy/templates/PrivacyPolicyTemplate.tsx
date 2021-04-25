import React from "react";
import Footer from "components/common/organisms/Footer";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import PolicyDocument from "../organisms/PolicyDocument";
import Title from "components/common/atoms/Title";

export default function PrivacyPolicyTemplate() {
  return (
    <div>
      <SimpleHeader />
      <Title>プライバシーポリシ</Title>
      <PolicyDocument title="利用状況解析ついて">
        本アプリでは、今後の開発の参考とするため、アプリの利用状況データを収集するツールとして
        Firebase(Google
        Inc.)を使用しており、Firebaseがご利用者の情報を自動取得する場合がございます。
        取得する情報、利用目的、第三者への提供等につきましては、以下のGoogleプライバシーポリシーのリンクよりご確認ください。&NewLine;
        Google プライバシーポリシー
      </PolicyDocument>
      <Footer />
    </div>
  );
}
