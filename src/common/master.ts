type CurrencyType = {
    [key: string]: string
}

type CategoryType = {
    [key: string]: string | CategoryType
}

export const CategoryMaster: CategoryType[] = [
]


export const CurrencyMaster: CurrencyType[] = [
]