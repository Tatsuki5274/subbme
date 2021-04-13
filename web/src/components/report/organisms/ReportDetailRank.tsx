import GrayText from "components/common/atoms/GrayText";
import { ReportService } from "entities/ReportService";
import styled from "styled-components";

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
