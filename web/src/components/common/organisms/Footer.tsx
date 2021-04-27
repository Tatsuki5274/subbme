import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
// import Text from "../atoms/Text";

export default function Footer(props: { children?: JSX.Element }) {
  const linkStyle = { color: "white" };
  return (
    <Container>
      <LinksStyle>
        <Link to="/privacy-policy/" style={linkStyle}>
          プライバシーポリシ
        </Link>
        <span> | </span>
        <Link to="/contact" style={linkStyle}>
          お問い合わせ
        </Link>
      </LinksStyle>
      <TextStyle>©2021 Tatsuki Watanabe. All rights rserved. </TextStyle>
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
