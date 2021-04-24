import React from "react";
import styled from "styled-components";

export default function Section(props: { children: string }) {
  return <TextStyle>{props.children}</TextStyle>;
}

const TextStyle = styled.span({
  fontSize: "40px",
});
