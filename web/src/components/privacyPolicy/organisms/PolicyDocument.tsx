import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";

export default function PolicyDocument(props: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Row justify="center">
      <Col
        xs={{ span: 20 }}
        sm={{ span: 20 }}
        md={{ span: 20 }}
        lg={{ span: 20 }}
        xl={{ span: 20 }}
      >
        <TitleStyle>{props.title}</TitleStyle>
      </Col>
      <Col
        xs={{ span: 20 }}
        sm={{ span: 20 }}
        md={{ span: 20 }}
        lg={{ span: 20 }}
        xl={{ span: 20 }}
      >
        <DescriptionStyle>{props.children}</DescriptionStyle>
      </Col>
    </Row>
  );
}

const TitleStyle = styled.h2({});
const DescriptionStyle = styled.span({});
