import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import Header from "components/common/organisms/Header";
import React from "react";
import { ServiceListCardType } from "../molecules/ServiceListCard";
import ServiceListData from "../organisms/ServiceListData";

type PropsType = {
    data?: ServiceListCardType[]
}

export default function ServiceListTemplate(props: PropsType){
    return (
        <>
            <Header />
            <Title>サービス登録</Title>
            {props.data ?
            <ServiceListData
                data={props.data}
            />
            : null}
            
            <Footer />
        </>
    );
}