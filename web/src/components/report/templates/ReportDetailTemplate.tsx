import GrayText from "components/common/atoms/GrayText";
import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import { ReportService } from "entities/ReportService";
import React from "react";
import styled from "styled-components";
import CircleBox from "../molecules/CircleBox";
import ReportDetailCommentCard from "../organisms/ReportDetailCommentCard";

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
