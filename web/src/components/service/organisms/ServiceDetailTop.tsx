import styled from "styled-components";
import React from "react";
import GrayText from "components/common/atoms/GrayText";

type PropsType = {
  serviceName: string;
  planName: string;
  originalPrice: string;
  categoryName: string[];
};

export default function ServiceDetailTop(props: PropsType) {
  return (
    <div>
      <ServiceNameStyle>
        <GrayText>{props.serviceName}</GrayText>
      </ServiceNameStyle>
      <PlanNameStyle>
        <GrayText>{props.planName}</GrayText>
      </PlanNameStyle>
      <OriginalPriceStyle>
        <GrayText>{props.originalPrice}</GrayText>
      </OriginalPriceStyle>
      <CategoryNameStyle>
        <GrayText>{props.categoryName.join("/")}</GrayText>
      </CategoryNameStyle>
    </div>
  );
}

const ServiceNameStyle = styled.span({
  textAlign: "center",
  display: "inline-block",
  width: "100%",
  fontSize: "35px",
});

const PlanNameStyle = styled.span({
  textAlign: "center",
  display: "inline-block",
  width: "100%",
  fontSize: "20px",
});

const OriginalPriceStyle = styled.span({
  textAlign: "center",
  display: "inline-block",
  width: "100%",
  fontSize: "27px",
});

const CategoryNameStyle = styled.span({
  textAlign: "center",
  display: "inline-block",
  width: "100%",
  fontSize: "20px",
});
