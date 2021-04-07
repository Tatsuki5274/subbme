import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import ReportChartRender from "../organisms/ReportChartRender";

export default function ReportChartTemplate() {
    return (
        <>
            <DrawerContainer>
                <ReportChartRender />                
            </DrawerContainer>
            <Footer/>
        </>
    )
}