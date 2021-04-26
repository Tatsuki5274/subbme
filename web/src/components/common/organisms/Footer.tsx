import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
// import Text from "../atoms/Text";

export default function Footer(props: { children?: JSX.Element }) {
  return (
    <Container>
      <LinksStyle>
        <Link to="/privacy-policy/" style={{ color: "white" }}>
          プライバシーポリシ
        </Link>
      </LinksStyle>
      <TextStyle>2021 All rights rserved Tatsuki Watanabe</TextStyle>
      <div>{props.children}</div>

      {/* <CopyRight>
        <div>
          <div>
          </div>
        </div>
      </CopyRight> */}
    </Container>
  );
}

const Container = styled.div({
  backgroundColor: "#5794C3",
  // height: "80px",
  padding: "15px 0",
  width: "100%",
  position: "relative",
  bottom: "0",
  color: "white",
  textAlign: "center",
});

const LinksStyle = styled.div({});

const CopyRight = styled.div({
  display: "flex",
  // flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80px",
  color: "white",
  textAlign: "center",
  width: "100%",
});

const TextStyle = styled.span({
  fontSize: "18px",
});
