import { Divider } from "antd";
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
          近年節約思考が広まり、お金の使い方を考える方が増えているように感じています。しかし節約する、というと変動費を抑えることに注視しがちで固定費に目を向けている人は少ないようです。
          そこで、固定費を削減することにフォーカスした新しい倹約術を広めることがサービスの最大の目標です。
        </TopPlainText>
      </VisionTextStyle>
      <Divider style={DividerStyle}>ABOUT SUBBLISH</Divider>
      <AboutTextStyle>
        <TopPlainText>
          固定費を一緒に管理してユーザーの金銭的な負担を減らしたいという目的で誕生したアプリです。
          Subblish（サブリッシュ）と呼びます。
        </TopPlainText>
        <TopPlainText>
          お金について勉強している中で感じた問題に向き合うことができるように試行錯誤をして作成しています。
        </TopPlainText>
      </AboutTextStyle>
      <Divider style={DividerStyle}>RELEASE</Divider>
      <ReleaseTextStyle>
        2021年6月、パブリックβ版WEBアプリ公開
        <br />
        年内正式版公開予定
      </ReleaseTextStyle>
      <Divider style={DividerStyle}>ROADMAP</Divider>
      <RoadmapStyle>
        <TopLoadMap />
      </RoadmapStyle>
      <Divider style={DividerStyle}>CONTACT</Divider>
      <ContactTextStyle>
        <Link to="/contact">こちらのフォーム(β版)</Link>
        <span>から送信していただけます。</span>
        <br />
        直接こちらのメールアドレス
        &quot;subblish@fastmail.jp&quot;までご連絡いただくことも可能です。
      </ContactTextStyle>
      <AttentionStyle>
        <TopPlainText>
          本サイトの情報またはプログラムは予告なしに変更・更新させていただくこと、あるいは、本サイトの運営を予告なしに中断または中止させていただくことがありますが、あらかじめご了承ください。
        </TopPlainText>
      </AttentionStyle>
      {/* <Link to="/page-2/">Go to page 2</Link> */}
      <Footer>{<StorysetLicense />}</Footer>
    </ContainerStyle>
  );
}

function StorysetLicense() {
  const StorysetStyle = styled.a({
    color: "white",
    fontSize: "12px",
  });

  return (
    <StorysetStyle href="https://storyset.com/finance">
      Illustration by Freepik Storyset
    </StorysetStyle>
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

const AttentionStyle = styled.div({
  margin: "40px 0",
  fontSize: "18px",
});
