import BorderLine from "components/common/atoms/BorderLine"
import GrayText from "components/common/atoms/GrayText"
import { useRate } from "hooks/ReportServiceHooks"
import React from "react"
import styled from "styled-components"
import IconBadActive from "../atoms/IconBadActive"
import IconBadInactive from "../atoms/IconBadInactive"
import IconGoodActive from "../atoms/IconGoodActive"
import IconGoodInactive from "../atoms/IconGoodInactive"
import { ReportNewFormType } from "../organisms/ReportNewForm"

type PropsType = {
    serviceName: string
    categoryName: string
    formattedPrice: string
    rankIndex: number
    serviceIndex: number
    values: ReportNewFormType
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function ServiceCard(props: PropsType) {
    const {isBad, isGood, rate, clickBad, clickGood} = useRate();
    props.values.ranks[props.rankIndex].services[props.serviceIndex].rate = rate;
    const iconStyle: React.CSSProperties = {
        fontSize: "60px",
    }
    return (
        <BaseStyle>
            <ServiceTopBoxStyle>
                <GrayText>{props.serviceName}</GrayText>
                <GrayText>{props.formattedPrice}</GrayText>
            </ServiceTopBoxStyle>

            <BorderLine />
            <ServiceCategoryStyle>
                <GrayText>
                    {props.categoryName}
                </GrayText>
            </ServiceCategoryStyle>
            <RatingStyle>
                {isGood ? 
                <IconGoodActive
                    onClick={clickGood}
                    style={iconStyle}
                /> : 
                <IconGoodInactive
                    onClick={clickGood}
                    style={iconStyle}
                />}
                
                {isBad ?
                <IconBadActive
                    onClick={clickBad}
                    style={iconStyle}
                /> :
                <IconBadInactive
                    onClick={clickBad}
                    style={iconStyle}
                />}
            </RatingStyle>
        </BaseStyle>
    )
}

const BaseStyle = styled.div({
    backgroundColor: "#FAFAFA",
    borderRadius: "5px",
    border: "solid 1px #707070",
    padding: "10px",
})

const ServiceTopBoxStyle = styled.div({
    display: "flex",
    justifyContent: "space-between",
    fontSize: "26px",
})

const RatingStyle = styled.div({
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
    marginBottom: "30px",
})

const ServiceCategoryStyle = styled.div({
    fontSize: "20px",
})