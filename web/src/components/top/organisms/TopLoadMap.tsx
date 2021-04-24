import { Steps } from "antd";
import React from "react";
const { Step } = Steps;

export default function TopLoadMap() {
  return (
    <Steps direction="vertical" current={3}>
      <Step
        title="インフラ構築"
        description="アーキテクチャ、ドメイン設定など"
      />
      <Step title="固定費登録機能" description="現状の固定費を入力する機能" />
      <Step
        title="分析機能"
        description="現状の固定費に対して評価を行なって振り返る機能"
      />
      <Step
        title="各種設定機能"
        description="セキュリティ情報を含む各種情報の変更機能"
      />
      <Step
        title="パブリックβリリース　5月を予定"
        description="簡易的な機能で公開"
      />
      <Step
        title="コンテンツ機能の実装"
        description="学習用の教材などのコンテンツ機能の実装"
      />
      <Step
        title="プレミアムプランの実装"
        description="より最適なコンテンツを提供するサービスを提供"
      />
      <Step
        title="モバイルアプリ化"
        description="顧客へのUXを高めるためにモバイルアプリの開発"
      />
      <Step
        title="AI対応"
        description="コンテンツとユーザーをAIで紐付けるサービスを提供"
      />
    </Steps>
  );
}
