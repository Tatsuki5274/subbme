import styled from "styled-components";
import Text from "../atoms/Text";

export default function Footer() {
  return (
    <Style>
      <CopyRight>
        <Text>©2021 Tatsuki Watanabe. All rights rserved.</Text>
      </CopyRight>
    </Style>
  );
}

const Style = styled.div({
  backgroundColor: "#5794C3",
  height: "20px",
  width: "100%",
  position: "relative",
  bottom: "0",
});

const CopyRight = styled.div({
  color: "white",
  textAlign: "center",
  width: "100%",
});
