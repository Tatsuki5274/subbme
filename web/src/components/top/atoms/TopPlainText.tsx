import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";

export default function TopPlainText(props: { children: string }) {
  return (
    <Container>
      <Row justify="center" align="top">
        <Col xs={20} sm={20} md={16} lg={14} xl={10}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
}

const Container = styled.div({
  textAlign: "left",
});
