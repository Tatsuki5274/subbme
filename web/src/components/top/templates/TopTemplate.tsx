import { Button, Divider } from "antd";
import Footer from "components/common/organisms/Footer";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import { Link } from "gatsby";
import React from "react";
import styled, { CSSProperties } from "styled-components";
import TopPlainText from "../atoms/TopPlainText";
import TopLoadMap from "../organisms/TopLoadMap";
import TopMainVisual from "../organisms/TopMainVisual";

export default function TopTemplate() {
  return (
    <ContainerStyle>
      <SimpleHeader />
      <TopMainVisual />
      <Divider style={DividerStyle}>VISION</Divider>
      <VisionTextStyle>
        <TopPlainText>
          近頃は物価の上昇に伴い厳しい状況になりつつあります。節約する、という時に軽視されがちな固定費を削減するということに
          フォーカスした新しい節約を広めることが目標です。
        </TopPlainText>
      </VisionTextStyle>
      <Divider style={DividerStyle}>ABOUT SUBBME</Divider>
      <AboutTextStyle>
        <TopPlainText>
          固定費を一緒に管理してユーザーの金銭的な負担を減らしたいという目的で誕生したアプリです。
          “Let’s manage your subscription with me”のsubscription with
          meから取ってSubbme（サブミー）と名付けました。
        </TopPlainText>
      </AboutTextStyle>
      <Divider style={DividerStyle}>RELEASE</Divider>
      <ReleaseTextStyle>
        2021年6月上旬、パブリックβ版WEBアプリ公開予定
        <br />
        ※リリースを保証する内容ではありません
      </ReleaseTextStyle>
      <Divider style={DividerStyle}>ROADMAP</Divider>
      <RoadmapStyle>
        <TopLoadMap />
      </RoadmapStyle>
      <Divider style={DividerStyle}>CONTACT</Divider>
      <ContactTextStyle>
        連絡用フォームは現在準備中です。
        <br />
        ご連絡の方は
        &quot;subbme@fastmail.jp&quot;までご連絡をお願いいたします。
      </ContactTextStyle>
      {/* <Link to="/page-2/">Go to page 2</Link> */}
      <Footer />
    </ContainerStyle>
  );
}
const ContainerStyle = styled.div({
  textAlign: "center",
});

const DividerStyle: CSSProperties = {
  fontSize: "40px",
};

const RoadmapStyle = styled.div({
  display: "inline-block",
  margin: "0 auto",
});

const VisionTextStyle = styled.span({
  fontSize: "18px",
});

const ReleaseTextStyle = VisionTextStyle;
const AboutTextStyle = VisionTextStyle;
const ContactTextStyle = VisionTextStyle;
