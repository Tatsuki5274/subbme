import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import React from "react";
import { ServiceListCardType } from "../molecules/ServiceListCard";
import ServiceListData from "../organisms/ServiceListData";
import ContentWrapper from "components/wrapper/ContentWrapper"
import styled from "styled-components";
import Text from "components/common/atoms/Text";
import ServiceListFunction from "../organisms/ServiceListFunction";
import { Service, ServiceUnitType } from "entities/Service";
import DrawerContainer from "components/wrapper/Drawer";
import EmptyData from "components/common/molecules/EmptyData";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { routeBuilder } from "router";


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
            <DrawerContainer>
                <>
                    <ContentWrapper>
                        <>
                            <Title>サービス一覧</Title>
                            <TotalCostStyle><Text>{props.formattedTotalCost}</Text></TotalCostStyle>
                            <ServiceListFunction
                                setUnit={props.setUnit}
                                serviceList={props.serviceList}
                                setServiceList={props.setServiceList}
                            />
                            {
                                props.cardData && props.cardData.length > 0 ?
                                <ServiceListData
                                    data={props.cardData}
                                />
                                : <EmptyData>
                                    <Link to={routeBuilder.serviceCreatePath()}>
                                        <Button
                                            type="primary"
                                        >サービス作成</Button>
                                    </Link>

                                </EmptyData>
                            }
                        </>
                    </ContentWrapper>
                </>
            </DrawerContainer>
            <Footer />
        </>
    );
}

const TotalCostStyle = styled.div({
    fontSize: "27px",
})