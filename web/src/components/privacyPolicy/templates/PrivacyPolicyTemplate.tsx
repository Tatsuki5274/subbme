import React from "react";
import Footer from "components/common/organisms/Footer";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import styled from "styled-components";
import PrivacyPolicyLatest from "../organisms/PrivacyPolicyLatest";

export default function PrivacyPolicyTemplate() {
  return (
    <div>
      <SimpleHeader />
      <TitleStyle>
        プライバシーポリシー（個人情報取扱方針/個人情報保護方針）
      </TitleStyle>
      <PrivacyPolicyLatest />
      <Footer />
    </div>
  );
}

const TitleStyle = styled.h2({
  textAlign: "center",
});
