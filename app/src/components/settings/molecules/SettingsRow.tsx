import { Tooltip } from "antd";
import React from "react";
import styled from "styled-components";

export default function SettingsRow(props: {
  onClick?: () => void;
  label: string;
  value: string;
  disabled?: boolean;
}) {
  return (
    <ContainerStyle>
      {props.disabled ? (
        <Tooltip title="機能は現在準備中です">
          <DisableStyle>変更</DisableStyle>
        </Tooltip>
      ) : (
        <LinkStyle>
          <span onClick={props.onClick}>変更</span>
          {/* <Link to={props.link}>変更</Link> */}
        </LinkStyle>
      )}

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

const DisableStyle = styled.div({
  color: "currentcolor",
  cursor: "not-allowed",
  opacity: "0.5",
  textDecoration: "none",
});
