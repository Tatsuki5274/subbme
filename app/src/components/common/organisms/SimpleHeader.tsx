import styled from "styled-components";
import Text from "../atoms/Text";

export default function SimpleHeader() {
  return (
    <Style>
      <Title>
        <Text>Subblish</Text>
      </Title>
    </Style>
  );
}

const Style = styled.div({
  backgroundColor: "#5794C3",
  height: "60px",
});

const Title = styled.span({
  color: "#FFFFFF",
  fontSize: "32px",
  display: "inline-block",
  marginLeft: "10px",
});
