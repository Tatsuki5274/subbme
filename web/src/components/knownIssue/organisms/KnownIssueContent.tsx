import { Divider } from "antd";
import Footer from "components/common/organisms/Footer";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import * as React from "react";

const KnownIssueContent = () => {
  return (
    <>
      <SimpleHeader />
      <Divider orientation="left">ログインが維持されない問題</Divider>
      <p>
        ログイン処理後、メッセージにログインに成功した旨のメッセージが表示された後に、ログイン画面へ遷移することがあります。その場合は再度ログインしていただけると解決することがあります。
      </p>
      <Divider orientation="left">Googleアカウントが連携できない問題</Divider>
      <p>
        Googleにてログインする機能がございますが、パスワードレス認証との組み合わせにより発生した技術的な問題により現在は一時的に無効にさせていただいています。こちらについては解決次第、認証を再開します。
      </p>
      <Footer />
    </>
  );
};
export default KnownIssueContent;
