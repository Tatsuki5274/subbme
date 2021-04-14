import BorderLine from "components/common/atoms/BorderLine";
import GrayText from "components/common/atoms/GrayText";
import { ReportService } from "entities/ReportService";
import { ServiceUnitDaysEnum } from "entities/Service";
import React from "react";
import styled from "styled-components";
import ServiceAdviceCard from "../molecules/ServiceAdviceCard";

type PropsType = {
  title: string;
  description: string; //ランク説明
  services: ReportService[];
};

export default function ReportDetailRank(props: PropsType) {
  const cost = 1000;
  const formattedCost = cost.toLocaleString();
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
            categoryName={sv.categoryName?.join("/") || ""}
            formattedCost={`¥${
              (sv.costPerDay || 0) * ServiceUnitDaysEnum.Month
            }`}
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
