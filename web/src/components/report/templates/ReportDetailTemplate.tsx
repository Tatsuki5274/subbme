import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import styled from "styled-components";
import ReportDetailCommentCard from "../organisms/ReportDetailCommentCard";

export default function ReportDetailTemplate() {
  return (
    <>
      <DrawerContainer>
        <CommentCardStyle>
          <ReportDetailCommentCard content="テストテスト" link="/hogehoge" />
        </CommentCardStyle>
      </DrawerContainer>
      <Footer />
    </>
  );
}

const CommentCardStyle = styled.div({
  margin: "0 15px",
});
