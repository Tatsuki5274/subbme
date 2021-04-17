import { Alert, Button } from "antd";
import BorderLine from "components/common/atoms/BorderLine";
import GrayText from "components/common/atoms/GrayText";
import {
  ReportServiceAdviceStatusEnum,
  ReportServiceAdviceStatusType,
} from "entities/ReportService";
import { Link } from "react-router-dom";
import styled from "styled-components";
import IconBadInactive from "../atoms/IconBadInactive";
import IconGoodInactive from "../atoms/IconGoodInactive";

type PropsType = {
  serviceName: string;
  serviceRate: number;
  formattedCost: string;
  categoryName: string;
  advice?: {
    comment: string;
    status: ReportServiceAdviceStatusType;
    link?: string; //アドバイス用リンク
  };
};

export default function ServiceAdviceCard(props: PropsType) {
  const iconStyle: React.CSSProperties = {
    fontSize: "60px",
  };

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
      <RatingStyle>
        {props.serviceRate >= 0 ? (
          <IconGoodInactive style={iconStyle} />
        ) : (
          <IconBadInactive style={iconStyle} />
        )}
      </RatingStyle>
      {props.advice ? (
        <StatusAlert
          message={props.advice?.comment}
          status={props.advice.status}
          actionLink={props.advice.link}
        />
      ) : null}
    </Container>
  );
}

function StatusAlert(props: {
  message: string;
  status: ReportServiceAdviceStatusType;
  actionLink?: string;
}): JSX.Element | null {
  const ActionButton = () => {
    if (props.actionLink) {
      return (
        <Link to={props.actionLink}>
          <Button>詳細</Button>
        </Link>
      );
    }
    return null;
  };

  switch (props.status) {
    case ReportServiceAdviceStatusEnum.SUCCESS:
      return (
        <Alert
          message={props.message}
          action={<ActionButton />}
          type="success"
        ></Alert>
      );
    case ReportServiceAdviceStatusEnum.WARNING:
      return (
        <Alert
          message={props.message}
          action={<ActionButton />}
          type="warning"
        ></Alert>
      );
    case ReportServiceAdviceStatusEnum.DANGER:
      return (
        <Alert
          message={props.message}
          action={<ActionButton />}
          type="error"
        ></Alert>
      );
    default:
      return <span>aaa</span>;
  }
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

const RatingStyle = styled.div({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "10px",
  marginBottom: "30px",
});
