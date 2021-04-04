import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import DrawerContainer from "components/wrapper/Drawer";
import { Service } from "entities/Service";
import React from "react";
import ReportNewForm from "../organisms/ReportNewForm";

type PropsType = {
    services: Service[] | null
}

export default function ReportNewTemplate(props: PropsType){
    if(!props.services){
        return <LoadingScreen />
    }
    return (
        <>
            <DrawerContainer>
                <>
                    <Title>サービス分析</Title>
                    <ReportNewForm
                        services={props.services}
                    />
                </>
            </DrawerContainer>
            <Footer />
        </>
    );
}