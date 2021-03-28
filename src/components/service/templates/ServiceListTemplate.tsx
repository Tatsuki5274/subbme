import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import Header from "components/common/organisms/Header";
import React from "react";
import { ServiceListCardType } from "../molecules/ServiceListCard";
import ServiceListData from "../organisms/ServiceListData";
import ContentWrapper from "components/wrapper/ContentWrapper"
import styled from "styled-components";
import Text from "components/common/atoms/Text";
import ServiceListFunction from "../organisms/ServiceListFunction";
import { Service, ServiceUnitType } from "entities/Service";


type PropsType = {
    formattedTotalCost: string
    cardData: ServiceListCardType[] | null
    setUnit: React.Dispatch<React.SetStateAction<ServiceUnitType>>

    serviceList: Service[] | null,
    setServiceList: React.Dispatch<React.SetStateAction<Service[] | null>>
}

export default function ServiceListTemplate(props: PropsType){
    return (
        <>
            <Header />
            <ContentWrapper>
                <>
                    <Title>サービス一覧</Title>
                    <TotalCostStyle><Text>{props.formattedTotalCost}</Text></TotalCostStyle>
                    <ServiceListFunction
                        setUnit={props.setUnit}
                        serviceList={props.serviceList}
                        setServiceList={props.setServiceList}
                    />
                    {props.cardData ?
                    <ServiceListData
                        data={props.cardData}
                    />
                    : null}
                </>
            </ContentWrapper>
            <Footer />
        </>
    );
}

const TotalCostStyle = styled.div({
    fontSize: "27px",
})