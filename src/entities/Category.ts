import { NullablePartial } from "libs/Util"

export type Category = {
    value: string
    label: string,
    children?: Category[]
}

