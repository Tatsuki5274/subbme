import { Col, Row } from "antd";
import React from "react";
import styled, { CSSProperties } from "styled-components";
// import MainVisual from "Savings-amico.svg";

export default function TopMainVisual() {
  return (
    <Row style={ContainerStyle}>
      <Col span={10}>
        <ImageStyle src="/assets/visual.svg" />
        {/* <img src="/assets/visual.svg" /> */}
      </Col>
      <Col span={14}>
        <MessageCenter>
          <MessageContainerStyle>
            <MessageStyle>
              なんとなくで続けている固定費はありませんか？
              <br />
              まずは固定費の見直しからしてみませんか？
            </MessageStyle>
            <ReleaseStyle>6月上旬、WEB版アプリリリース予定</ReleaseStyle>
          </MessageContainerStyle>
        </MessageCenter>
      </Col>
    </Row>
  );
}

const ContainerStyle: CSSProperties = {
  height: "350px",
  backgroundColor: "#5794C3",
  color: "white",
};

const ImageStyle = styled.img({ height: "350px" });

const MessageCenter = styled.div({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const MessageContainerStyle = styled.div({ height: "auto" });

const MessageStyle = styled.div({
  textAlign: "left",
  fontSize: "30px",
});

const ReleaseStyle = styled.div({
  fontSize: "30px",
  textAlign: "left",
  marginTop: "25px",
});
