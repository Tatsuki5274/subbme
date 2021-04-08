import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import { Service } from "entities/Service";
import React from "react";
import ServiceEditForm from "../organisms/ServiceEditForm";

type PropsType = {
    service: Service
}

export default function ServiceEditTemplate(props: PropsType){
    return (
        <>
            <DrawerContainer>
                <>
                    <Title>サービス変更</Title>
                    <ServiceEditForm
                        service={props.service}
                    />
                </>
            </DrawerContainer>
            <Footer />
        </>
    );
}