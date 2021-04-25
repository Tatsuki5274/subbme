import React from "react";
import styled from "styled-components";
// import Text from "../atoms/Text";

export default function Footer() {
  return (
    <Style>
      <CopyRight>
        <div>
          <div>
            <TextStyle>2021 All rights rserved Tatsuki Watanabe</TextStyle>
          </div>
          <div>
            <StorysetStyle href="https://storyset.com/finance">
              Illustration by Freepik Storyset
            </StorysetStyle>
          </div>
        </div>
      </CopyRight>
    </Style>
  );
}

const Style = styled.div({
  backgroundColor: "#5794C3",
  // height: "80px",
  width: "100%",
  position: "relative",
  bottom: "0",
});

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

const StorysetStyle = styled.a({
  color: "white",
  fontSize: "12px",
});
