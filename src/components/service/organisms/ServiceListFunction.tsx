import { Service } from "entities/Service";

export type ServiceListFunctionType = {
    serviceName: string
    planName: string
    originalUnit: string
    originalUnitTerm: string
    originalCostPerUnitTerm: number
    originalCurrency: string
    convertUnit: string
    convertUnitTerm: string
    convertCostPerUnitTerm: number
    convertCurrency: string
}

type PropsType = {
    service: {
        set: ()=> {}
        get: ServiceListFunctionType
    }
}

/**
 * @description ServiceListFunctionTypeからServiceListCardTypeを生成する
 * @returns 
 */
export default function ServiceListFunction(props: PropsType){
    return null;
}