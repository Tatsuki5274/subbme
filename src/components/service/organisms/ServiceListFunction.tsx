import { Select } from "antd";
import { Service, ServiceUnitEnum, ServiceUnitType } from "entities/Service";
import React from "react";
import { getServiceUnitString, getServiceUnitValue } from "repositories/Services";
const { Option } = Select;

export type ServiceListFunctionType = {
    serviceName: string
    planName: string
    unit: string
    unitTerm: string
    costPerDay: number
    currency: string
}

type PropsType = {
    setUnit: React.Dispatch<React.SetStateAction<ServiceUnitType>>
}

/**
 * @returns 
 */
export default function ServiceListFunction(props: PropsType){
    return (
        <Select
            placeholder="Select a option and change input text above"
            onChange={(value) => {
                props.setUnit(value);
            }}
            defaultValue={ServiceUnitEnum.Month}
        >
            {Object.values(ServiceUnitEnum).map(unit => {
                return (
                    <Option value={unit}>{getServiceUnitString(unit)}</Option>
                )
            })}
      </Select>
    );
}