import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import ReportNewForm from "../organisms/ReportNewForm";

export default function ReportNewTemplate(){
    return (
        <>
            <DrawerContainer>
                <>
                    <ReportNewForm />
                </>
            </DrawerContainer>
            <Footer />
        </>
    );
}