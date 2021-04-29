import React from "react";
import styled from "styled-components";

export default function SimpleHeader() {
  return (
    <Style>
      <TextPosition>
        <Title>Subbny</Title>
      </TextPosition>
    </Style>
  );
}

const Style = styled.div({
  textAlign: "left",
  backgroundColor: "#5794C3",
  height: "60px",
});

const TextPosition = styled.div({
  display: "inline-block",
  marginLeft: "30px",
});

const Title = styled.span({
  color: "#FFFFFF",
  fontSize: "40px",
  display: "inline-block",
  marginLeft: "10px",
});
