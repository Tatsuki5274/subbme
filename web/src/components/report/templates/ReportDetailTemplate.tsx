import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import ReportDetailCommentCard from "../organisms/ReportDetailCommentCard";

export default function ReportDetailTemplate() {
  return (
    <>
      <DrawerContainer>
        <ReportDetailCommentCard content="テストテスト" link="/hogehoge" />
      </DrawerContainer>
      <Footer />
    </>
  );
}
