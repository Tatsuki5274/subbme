import {useFormik} from 'formik'
import { Service } from "entities/Service";
import { ReportManager } from 'repositories/Reports';
import { Report } from 'entities/Report';




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

type FormType = {
    comment: string     // 振り返りコメント 
    ranks: {
        services: {
            serviceID: string,
            serviceName: string,
            categoryName: string,
            costPerDay: number,
            rate: number | null    // 自己評価
        }[]
    }[]
}

export default function ReportNewForm(props: PropsType){
    const mock :Service[] = [
        {
            id: "1",
            costPerDay: 50,
            serviceName: "50円"
        },
        {
            id: "2",
            costPerDay: 20,
            serviceName: "20円"
        },
        {
            id: "3",
            costPerDay: 100,
            serviceName: "100円"
        },
        {
            id: "4",
            costPerDay: null,
            serviceName: "未設定のサービス"
        }
    ]
    const res = divABC(mock, 60, 30, 10);
    const serviceABC: Service[][] = [
        res.A,
        res.B,
        res.C,
    ];

    console.log(res);
    const formik = useFormik<FormType>({
        initialValues: {
            comment: "",
            ranks: serviceABC.map(svABC => {
                const abc = svABC.map(sv => {
                    // Todo カテゴリの参照を追加
                    return {
                        serviceID: sv.id || "",
                        serviceName: sv.serviceName || "",
                        categoryName: "",   //sv.categoryID
                        rate: null,
                        costPerDay: sv.costPerDay || 0
                    }
                });
                return {
                    services: abc
                };
            }),
        },
        onSubmit: async (values) => {
            const reportManager = new ReportManager();
            const mock: Report = {
                userID: "me",
                resultComment: "総評",
            }
            await reportManager.add(mock);
            console.log(values)
        }
    });

    return <form onSubmit={formik.handleSubmit}>
        {formik.values.ranks.map((rank, rankIdx) => {
            return (
                <div>
                    <div>ランク{rankIdx}</div>
                    <div>ランクメッセージ</div>
                    {rank.services.map((service, serviceIdx) => {
                        return (
                            <>
                                <div>{service.serviceName}</div>
                                <input
                                    name={`ranks[${rankIdx}]services[${serviceIdx}]rate`}
                                    type="number"
                                    onChange={formik.handleChange}
                                />
                            </>
                        )
                    })}
                </div>
            )
        })}
        <button type="submit">submit</button>
    </form>;
}