import { ServiceUnitDaysEnum, ServiceUnitEnum, ServiceUnitType } from "entities/Service";

export type NullablePartial<T> = { [P in keyof T]?: T[P] | undefined | null; }

/**
 * 
 * @param unit 変換元の単位
 * @returns 単位の日数
 */
export function convertUnitToDay(unit: ServiceUnitType | null | undefined): number {
    let result = 0;
    switch(unit) {
        case ServiceUnitEnum.Year:
            result = ServiceUnitDaysEnum.Year;
            break;
        case ServiceUnitEnum.Month:
            result = ServiceUnitDaysEnum.Month;
            break;
        case ServiceUnitEnum.Day:
            result = ServiceUnitDaysEnum.Day;
            break;
    }
    return result;
}

/**
 * 
 * @param unit 変換元の単位
 * @returns 変換後の表示用文字列
 */
export function convertUnitToString(unit: ServiceUnitType | null | undefined): string {
    let result = "";
    switch(unit) {
        case ServiceUnitEnum.Year:
            result = "年";
            break;
        case ServiceUnitEnum.Month:
            result = "月";
            break;
        case ServiceUnitEnum.Day:
            result = "日";
            break;
    }
    return result;
}