import { Col, Row } from "antd";
import React from "react";
import { CSSProperties } from "styled-components";
// import MainVisual from "Savings-amico.svg";

export default function TopMainVisual() {
  return (
    <Row style={ContainerStyle}>
      <Col span={10}>
        <img src="/assets/visual.svg" />
      </Col>
      <Col span={14}>col-12</Col>
    </Row>
  );
}

const ContainerStyle: CSSProperties = {
  height: "350px",
  backgroundColor: "#5794C3",
  color: "white",
};
