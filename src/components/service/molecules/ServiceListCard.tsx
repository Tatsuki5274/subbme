import React from "react"
import BorderLine from "components/common/atoms/BorderLine"
import styled from "styled-components"

// export type ServiceListCardType = {
//     serviceName: string
//     planName: string
//     originalUnit: string
//     originalUnitTerm: string
//     originalCostPerUnitTerm: number
//     originalCurrency: string
//     convertUnit: string
//     convertUnitTerm: string
//     convertCostPerUnitTerm: number
//     convertCurrency: string
// }

export type ServiceListCardType = {
    serviceName: string
    planName: string
    formattedOriginalPrice: string
    formattedConvertPrice: string
}

export default function ServiceListCard(props: ServiceListCardType){
    return (
        <Card>
            <ServiceNameStyle>
                {props.serviceName}
            </ServiceNameStyle>
            <ServicePlanStyle>
                {props.planName}
            </ServicePlanStyle>
            <LineStyle>
                <BorderLine />
            </LineStyle>
            <ConvertPriceStyle>
                {props.formattedConvertPrice}
            </ConvertPriceStyle>
            <OriginalPriceStyle>
                {props.formattedOriginalPrice}
            </OriginalPriceStyle>
        </Card>
    )
}

const Card = styled.div({
    backgroundColor: "#FAFAFA",
    border: "1px solid",
    borderColor: "#707070",
    borderRadius: "5px",
    color: "#868E96",
    padding: "10px"
})

const LineStyle = styled.div({
    width: "95%",
    margin: "0 auto"
})

const ServiceNameStyle = styled.div({
    display: "inline-block",
    width: "50%",
    textAlign: "left",
    fontSize: "26px",
})

const ServicePlanStyle = styled.div({
    display: "inline-block",
    width: "50%",
    textAlign: "right",
    fontSize: "26px",
})

const ConvertPriceStyle = styled.div({
    display: "inline-block",
    width: "50%",
    textAlign: "left",
    fontSize: "24px",
})

const OriginalPriceStyle = styled.div({
    display: "inline-block",
    width: "50%",
    textAlign: "right",
    fontSize: "24px",
})