import { Steps } from "antd";
import React from "react";
const { Step } = Steps;

export default function TopLoadMap() {
  return (
    <Steps direction="vertical" current={5}>
      <Step
        title="2020年9月 企画段階"
        description="コンテンツやアプリの構想、アイデア段階"
      />
      <Step
        title="2月 ワイヤーフレーム作成"
        description="画面のレイアウトや仕様を作成"
      />
      <Step
        title="3月 インフラ構築"
        description="アーキテクチャ、ドメイン設定など"
      />
      <Step
        title="3月 固定費登録機能"
        description="現状の固定費を入力する機能"
      />
      <Step
        title="4月 分析機能"
        description="現状の固定費に対して評価を行なって振り返る機能"
      />
      <Step
        title="4月 各種設定機能"
        description="セキュリティ情報を含む各種情報の変更機能"
      />
      <Step
        title="5月 各種情報作成"
        description="プライバシーポリシや事業に関する情報の作成"
      />
      <Step
        title="6月予定 パブリックβリリース"
        description="簡易的な機能で公開"
      />
      <Step
        title="秋予定 コンテンツ機能の実装"
        description="学習用の教材などのコンテンツ機能の実装"
      />
      <Step
        title="秋予定 製品版リリース"
        description="一般公開用WEBアプリのリリース"
      />
      <Step
        title="年内予定 プレミアムプランの実装"
        description="より最適なコンテンツを提供するサービスを提供"
      />
      <Step
        title="来年以降予定 モバイルアプリ化"
        description="顧客へのUXを高めるためにモバイルアプリの開発"
      />
      <Step
        title="来年以降予定 AI対応"
        description="コンテンツとユーザーをAIで紐付けるサービスを提供"
      />
    </Steps>
  );
}
