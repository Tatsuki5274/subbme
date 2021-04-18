import BorderLine from "components/common/atoms/BorderLine";
import GrayText from "components/common/atoms/GrayText";
import {
  ReportService,
  ReportServiceAdviceStatusEnum,
} from "entities/ReportService";
import { ServiceUnitDaysEnum } from "entities/Service";
import React from "react";
import styled from "styled-components";
import ServiceAdviceCard from "../molecules/ServiceAdviceCard";

export default function ReportDetailRank(props: {
  title: string;
  description: string; //ランク説明
  services: ReportService[];
}) {
  // 各サービスの合計金額を算出する
  let costPerDaySum = 0;
  props.services.forEach((sv) => {
    costPerDaySum += sv.costPerDay || 0;
  });
  // 月単位の金額にフォーマットする
  const formattedCost = `¥${Math.round(
    (costPerDaySum || 0) * ServiceUnitDaysEnum.Month
  ).toLocaleString()}/1ヶ月`;
  return (
    <>
      <TitleContainer>
        <TitleStyle>
          <GrayText>{props.title}</GrayText>
        </TitleStyle>
        <CostStyle>
          <GrayText>{formattedCost}</GrayText>
        </CostStyle>
      </TitleContainer>
      <BorderLine />
      <DescriptionStyle>{props.description}</DescriptionStyle>
      {props.services.map((sv) => {
        return (
          <ServiceAdviceCard
            key={sv.id}
            serviceName={sv.serviceName || ""}
            serviceRate={sv.rate || 0}
            categoryName={sv.categoryName?.join("/") || ""}
            formattedCost={`¥${Math.round(
              (sv.costPerDay || 0) * ServiceUnitDaysEnum.Month
            ).toLocaleString()}/1ヶ月`}
            advice={
              sv.advice
                ? {
                    comment: sv.advice.comment || "",
                    status:
                      sv.advice?.status ||
                      ReportServiceAdviceStatusEnum.WARNING,
                    link: sv.advice?.actionLink,
                  }
                : undefined
            }
          />
        );
      })}
    </>
  );
}

const TitleContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "26px",
});
const TitleStyle = styled.span({});
const CostStyle = styled.span({});
const DescriptionStyle = styled.div({
  margin: "20px 0",
});
