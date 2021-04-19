import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import SettingsHome from "../organisms/SettingsHome";

export default function SettingsTemplate() {
  return (
    <>
      <DrawerContainer>
        <SettingsHome />
      </DrawerContainer>
      <Footer />
    </>
  );
}
