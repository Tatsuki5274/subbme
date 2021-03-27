import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import Header from "components/common/organisms/Header";
import React from "react";
import { ServiceListCardType } from "../molecules/ServiceListCard";
import ServiceListData from "../organisms/ServiceListData";
import ContentWrapper from "components/wrapper/ContentWrapper"
import styled from "styled-components";
import Text from "components/common/atoms/Text";


type PropsType = {
    formattedTotalCost: string
    data?: ServiceListCardType[]
}

export default function ServiceListTemplate(props: PropsType){
    return (
        <>
            <Header />
            <ContentWrapper>
                <>
                    <Title>サービス一覧</Title>
                    <TotalCostStyle><Text>{props.formattedTotalCost}</Text></TotalCostStyle>
                    {props.data ?
                    <ServiceListData
                        data={props.data}
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