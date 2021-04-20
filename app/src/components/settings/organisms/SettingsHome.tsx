import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import styled from "styled-components";
import SettingsRow from "../molecules/SettingsRow";

export default function SettingsHome() {
  return (
    <>
      <Title>設定</Title>
      <SubTitle>認証情報</SubTitle>
      <RowsWrapperStyle>
        <SettingsRow
          link=""
          label="メールアドレス"
          value="hoge@subbme.com"
          disabled
        />
        <SettingsRow link="" label="パスワード" value="********" />
      </RowsWrapperStyle>
    </>
  );
}

const RowsWrapperStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
  // border-collapse:separate;
});
