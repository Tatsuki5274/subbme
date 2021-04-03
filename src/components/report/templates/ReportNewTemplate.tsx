import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import ReportNewForm from "../organisms/ReportNewForm";

export default function ReportNewTemplate(){
    return (
        <>
            <DrawerContainer>
                <>
                    <Title>サービス分析</Title>
                    <ReportNewForm />
                </>
            </DrawerContainer>
            <Footer />
        </>
    );
}