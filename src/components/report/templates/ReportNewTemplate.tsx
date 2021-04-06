import { Button } from "antd";
import Title from "components/common/atoms/Title";
import EmptyData from "components/common/molecules/EmptyData";
import Footer from "components/common/organisms/Footer";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import DrawerContainer from "components/wrapper/Drawer";
import { Service } from "entities/Service";
import React from "react";
import { Link } from "react-router-dom";
import { routeBuilder } from "router";
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
                    {
                        props.services && props.services.length > 0 ?
                        <ReportNewForm
                            services={props.services}
                        /> :
                        <EmptyData>
                            <Link to={routeBuilder.serviceCreatePath()}>
                                <Button
                                    type="primary"
                                >サービス作成</Button>
                            </Link>
                        </EmptyData>
                    }

                </>
            </DrawerContainer>
            <Footer />
        </>
    );
}