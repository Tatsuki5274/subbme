import GrayText from "components/common/atoms/GrayText";
import styled from "styled-components";

type PropsType = {
  content?: string;
  link?: string;
};

export default function ReportDetailCommentCard(props: PropsType) {
  return (
    <CardBox>
      <GrayText>{props.content}</GrayText>
    </CardBox>
  );
}

const CardBox = styled.div({
  border: "solid 1px black",
});
