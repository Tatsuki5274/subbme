import React from "react";
import styled from "styled-components";
// import Text from "../atoms/Text";

export default function Footer() {
  return (
    <Style>
      <CopyRight>
        <TextStyle>2021 All rights rserved Tatsuki Watanabe</TextStyle>
      </CopyRight>
    </Style>
  );
}

const Style = styled.div({
  backgroundColor: "#5794C3",
  height: "60px",
  width: "100%",
  position: "relative",
  bottom: "0",
});

const CopyRight = styled.div({
  color: "white",
  textAlign: "center",
  width: "100%",
});

const TextStyle = styled.span({
  fontSize: "18px",
  lineHeight: "60px",
});
