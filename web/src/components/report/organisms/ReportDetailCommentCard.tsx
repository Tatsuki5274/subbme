import GrayText from "components/common/atoms/GrayText";
import styled from "styled-components";

type PropsType = {
  content?: string;
  link?: string;
};

export default function ReportDetailCommentCard(props: PropsType) {
  if (!props.content && !props.link) {
    return null;
  }
  return (
    <CardBox>
      <CardTitle>
        <GrayText>総評</GrayText>
      </CardTitle>
      <GrayText>{props.content}</GrayText>
    </CardBox>
  );
}

const CardBox = styled.div({
  border: "solid 1px #E0E0E0",
});

const CardTitle = styled.span({});
