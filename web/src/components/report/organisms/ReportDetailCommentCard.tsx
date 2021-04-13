import { Link } from "react-router-dom";
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
      <CardTitle>総評</CardTitle>
      <ContentStyle>{props.content}</ContentStyle>
      {props.link ? (
        <LinkStyle>
          <Link to="/empty">詳細</Link>
        </LinkStyle>
      ) : null}
    </CardBox>
  );
}

const CardBox = styled.div({
  border: "solid 1px #E0E0E0",
  padding: "15px",
});

const CardTitle = styled.div({
  fontSize: "20px",
  marginBottom: "15px",
});

const ContentStyle = styled.div({});

const LinkStyle = styled.div({
  marginTop: "15px",
});
