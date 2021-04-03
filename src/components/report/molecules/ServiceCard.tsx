import BorderLine from "components/common/atoms/BorderLine"
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
    return (
        <>
            <ServiceTopBoxStyle>
                <span>{props.serviceName}</span>
                <span>{props.formattedPrice}</span>
            </ServiceTopBoxStyle>

            <BorderLine />
            <div>
                {props.categoryName}
            </div>
            {isGood ? 
            <IconGoodActive
                onClick={clickGood}
             /> : 
            <IconGoodInactive
                onClick={clickGood}
            />}
            
            {isBad ?
            <IconBadActive
                onClick={clickBad}
            /> :
            <IconBadInactive
                onClick={clickBad}
            />}
        </>
    )
}

const ServiceTopBoxStyle = styled.div({
    display: "flex",
    justifyContent: "space-between",
})