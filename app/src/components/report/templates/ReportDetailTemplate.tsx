import GrayText from "components/common/atoms/GrayText";
import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import { ReportService } from "entities/ReportService";
import React from "react";
import styled from "styled-components";
import CircleBox from "../molecules/CircleBox";
import ReportDetailCommentCard from "../organisms/ReportDetailCommentCard";
import ReportDetailRank from "../organisms/ReportDetailRank";

type PropsType = {
  recommend?: {
    comment?: string;
    link?: string;
  };
  score: number;
  serviceListA: ReportService[];
  serviceListB: ReportService[];
  serviceListC: ReportService[];
};

export default function ReportDetailTemplate(props: PropsType) {
  return (
    <>
      <DrawerContainer>
        <>
          <Title>サービス分析結果</Title>
          {props.recommend ? (
            <CommentCardStyle>
              <ReportDetailCommentCard
                content={props.recommend.comment}
                link={props.recommend.link}
              />
            </CommentCardStyle>
          ) : null}

          <CircleStyle>
            <CircleBox>
              <GrayText>{props.score}</GrayText>
            </CircleBox>
          </CircleStyle>
          <ReportDetailRank
            title="ランクA"
            description="支出の多くを占めている分類です。この分類を見直すことで劇的な家計改善を期待できます。"
            services={props.serviceListA}
          />
          <ReportDetailRank
            title="ランクB"
            description="支出の多くを占めている分類です。この分類を見直すことで劇的な家計改善を期待できます。"
            services={props.serviceListB}
          />
          <ReportDetailRank
            title="ランクC"
            description="支出の多くを占めている分類です。この分類を見直すことで劇的な家計改善を期待できます。"
            services={props.serviceListC}
          />
        </>
      </DrawerContainer>
      <Footer />
    </>
  );
}

const CommentCardStyle = styled.div({
  margin: "0 15px",
});

const CircleStyle = styled.div({
  width: "110px",
  height: "110px",
  fontSize: "40px",
  margin: "0 auto",
});
