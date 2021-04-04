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
        <BaseStyle>
            <ServiceTopBoxStyle>
                <span>{props.serviceName}</span>
                <span>{props.formattedPrice}</span>
            </ServiceTopBoxStyle>

            <BorderLine />
            <div>
                {props.categoryName}
            </div>
            <RatingStyle>
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
            </RatingStyle>
        </BaseStyle>
    )
}

const BaseStyle = styled.div({
    backgroundColor: "#FAFAFA",
    borderRadius: "5px",
    border: "solid 1px #707070"
})

const ServiceTopBoxStyle = styled.div({
    display: "flex",
    justifyContent: "space-between",
})

const RatingStyle = styled.div({
    display: "flex",
    justifyContent: "space-around",
})