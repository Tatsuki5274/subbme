import { Spin } from "antd";
import React from "react";
import styled from "styled-components";

export default function LoadingScreen() {
  return (
    <Overlay>
      <OverlayText>
        <Spin />
      </OverlayText>
    </Overlay>
  );
}

const Overlay = styled.div({
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(100, 100, 100, .3)",
  zIndex: 2147483647,
});

const OverlayText = styled.div({
  position: "absolute",
  left: "50%",
  top: "50%",
  width: "100%",
  transform: "translate(-50%, -50%)",
  color: "rgba(250, 250, 250, 1)",
  // fontSize:
  textAlign: "center",
});

// position: absolute;
// left: 50%; top: 50%;
// width: 100%;
// transform: translate(-50%, -50%);
// color: rgba(250, 250, 250, 1);
// font-size: 24px;
// text-align: center;
