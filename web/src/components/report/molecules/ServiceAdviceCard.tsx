import BorderLine from "components/common/atoms/BorderLine";
import GrayText from "components/common/atoms/GrayText";
import { ReportServiceAdviceStatusType } from "entities/ReportService";
import styled from "styled-components";

type PropsType = {
  serviceName: string;
  formattedCost: string;
  categoryName: string;
  advice?: {
    comment: string;
    status: ReportServiceAdviceStatusType;
  };
};

export default function ServiceAdviceCard(props: PropsType) {
  return (
    <Container>
      <ServiceTopContainer>
        <ServiceNameStyle>
          <GrayText>{props.serviceName}</GrayText>
        </ServiceNameStyle>
        <ServiceCostStyle>
          <GrayText>{props.formattedCost}</GrayText>
        </ServiceCostStyle>
      </ServiceTopContainer>
      <BorderLine />
      <CategoryNameStyle>
        <GrayText>{props.categoryName}</GrayText>
      </CategoryNameStyle>
    </Container>
  );
}

const Container = styled.div({
  backgroundColor: "#FAFAFA",
  border: "solid 1px #707070",
  borderRadius: "5px",
  padding: "10px",
});
const ServiceTopContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
});
const ServiceNameStyle = styled.span({
  fontSize: "26px",
});
const ServiceCostStyle = styled.span({
  fontSize: "26px",
});
const CategoryNameStyle = styled.span({
  fontSize: "20px",
});
