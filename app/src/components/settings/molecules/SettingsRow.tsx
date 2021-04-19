import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SettingsRow(props: {
  link: string;
  label: string;
  value: string;
}) {
  return (
    <ContainerStyle>
      <LinkStyle>
        <Link to={props.link}>変更</Link>
      </LinkStyle>
      <LabelStyle>{props.label}</LabelStyle>
      <ValueStyle>{props.value}</ValueStyle>
    </ContainerStyle>
  );
}

const ContainerStyle = styled.tr({
  // display: "flex",
  // justifyContent: "space-between",
});

const LinkStyle = styled.td({
  // margin: "10px",
});
const LabelStyle = styled.td({});
const ValueStyle = styled.td({});
