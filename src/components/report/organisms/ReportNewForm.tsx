import {useFormik} from 'formik'
import { Service } from "entities/Service";


type FormType = {
    comment: string     // 振り返りコメント 
    ranks: {
        services: {
            serviceID: string
            rate: number | null    // 自己評価
        }[]
    }[]
}

type PropsType = {
    // services: Service[]
}

/**
 * 
 * @param services 分類対象のサービスリスト
 * @param A A群の割合(%)
 * @param B B群の割合(%)
 * @param C C群の割合(%)
 * @returns 分類結果
 */
function divABC
(services: Service[] , groupA: number, groupB: number, groupC: number):
{
    A: Service[],
    B: Service[],
    C: Service[],
} {
    // 結果格納用オブジェクトの初期化
    const resultGroupA: Service[] = [];
    const resultGroupB: Service[] = [];
    const resultGroupC: Service[] = [];

    // 累積保存用オブジェクトの初期化
    let currentCost = 0;

    const groupAPercent = groupA;
    const groupBPercent = groupA + groupB;
    const groupCPercent = groupA + groupB + groupC;

    // 作業用のオブジェクトを生成
    const work = services.concat();

    // 価格の高い順に並び替える
    work.sort((a, b) => {
        let result = false;
        const direction = true;
        if(!a.costPerDay){
            result = direction;
        } else if (!b.costPerDay) {
            result = !direction;
        } else {
            result = a.costPerDay > b.costPerDay ? !direction : direction
        }
        return result ? 1 : -1;
    });

    // 合計金額を算出
    let totalCost = 0;
    work.forEach(sv => {
        totalCost += sv.costPerDay || 0;
    });

    work.forEach(sv => {
        const currentPercent = currentCost / totalCost * 100;
        if (currentPercent <= groupAPercent) {
            resultGroupA.push(sv);
        } else if (currentPercent <= groupBPercent) {
            resultGroupB.push(sv);
        } else if (currentPercent <= groupCPercent) {
            resultGroupC.push(sv);
        } else {
            throw new Error("与えられた分類の割合が100%を超えました");
        }
        currentCost += sv.costPerDay || 0;
    });
    return {
        A: resultGroupA,
        B: resultGroupB,
        C: resultGroupC,
    };
}

export default function ReportNewForm(props: PropsType){
    const mock :Service[] = [
        {
            id: "1",
            costPerDay: 50
        },
        {
            id: "2",
            costPerDay: 20,
        },
        {
            id: "3",
            costPerDay: 100
        },
        {
            id: "4",
            costPerDay: null,
        }
    ]
    const res = divABC(mock, 60, 30, 10);
    console.log(res);
    // const formik = useFormik<FormType>({
    //     initialValues: {
    //         comment: "",
    //         ranks: ,
    //     },
    //     onSubmit: (values) => {
    //         console.log(values)
    //     }
    // });
    return <span>done</span>;
}