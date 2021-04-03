import BorderLine from "components/common/atoms/BorderLine"
import React from "react"

type PropsType = {
    serviceName: string
    rankIndex: number
    serviceIndex: number
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function ServiceCard(props: PropsType) {
    return (
        <>
            <div>{props.serviceName}</div>
            <BorderLine />
            <input
                name={`ranks[${props.rankIndex}]services[${props.serviceIndex}]rate`}
                type="number"
                onChange={props.handleChange}
            />
        </>
    )}