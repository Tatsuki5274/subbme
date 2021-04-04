import {useFormik} from 'formik'
import { Service, ServiceUnitDaysEnum } from "entities/Service";
import { ReportManager } from 'repositories/Reports';
import { Report } from 'entities/Report';
import { message } from 'antd';
import { ReportServiceManager } from 'repositories/ReportServices';
import { useUser } from 'hooks/UserHooks';
import { convertRank, ReportServiceRankType } from 'entities/ReportService';
import { useHistory } from 'react-router';
import { routeBuilder } from 'router';
import firebase from "libs/Firebase"
import BorderLine from 'components/common/atoms/BorderLine';
import ServiceCard from '../molecules/ServiceCard';



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
export type ReportNewFormType = FormType;

export default function ReportNewForm(props: PropsType){
    const {currentUser} = useUser();
    const history = useHistory();
    const mock :Service[] = [
        {
            id: "1",
            costPerDay: 50,
            serviceName: "50円",
            categoryName: "保険"
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
    const rankMessage = [
        "ランクAのメッセージ",
        "ランクBのメッセージ",
        "ランクCのメッセージ",
    ]

    const formik = useFormik<FormType>({
        initialValues: {
            comment: "",
            ranks: serviceABC.map(svABC => {
                const abc = svABC.map(sv => {
                    return {
                        serviceID: sv.id || "",
                        serviceName: sv.serviceName || "",
                        categoryName: sv.categoryName || "分類なし",   
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
            if (!currentUser?.uid) {
                message.error("ユーザー情報を確認できせんでした");
                return;
            }

            // 各種合計を計算
            let groupAScore = 0;
            let groupBScore = 0;
            let groupCScore = 0;
            
            values.ranks[0].services.forEach(sv => {
                groupAScore += sv.rate || 0;
            });
            values.ranks[1].services.forEach(sv => {
                groupBScore += sv.rate || 0;
            })
            values.ranks[2].services.forEach(sv => {
                groupCScore += sv.rate || 0;
            })

            // スコアの重み
            const groupAWeight = 5;
            const groupBWeight = 3;
            const groupCWeight = 1;

            const totalScore = 
                groupAScore * groupAWeight +
                groupBScore * groupBWeight +
                groupCScore * groupCWeight;

            // レポートを作成
            const reportManager = new ReportManager();
            const reportParam: Report = {
                userID: currentUser.uid,
                resultComment: values.comment,
                score: totalScore,
                createdAt: firebase.firestore.Timestamp.now(),
                updatedAt: firebase.firestore.Timestamp.now(),
            }
            const createdReport = await reportManager.add(reportParam);

            if(createdReport){
                // 作成したレポートのサービス情報を保存
                const reportServiceManager = new ReportServiceManager(createdReport.id);
                await Promise.all(values.ranks.map(async (rank, rankIdx) => {
                    let rankStr: ReportServiceRankType = "C";
                    switch(rankIdx){
                        case 0:
                            rankStr = "A";
                            break;
                        case 1:
                            rankStr = "B";
                            break;
                        case 2:
                            rankStr = "C";
                            break;
                        default:
                            throw new Error(`rank index is unknown(${rankIdx})`)
                    }

                    await Promise.all(rank.services.map(async (service) => {
                        await reportServiceManager.add({
                            rank: rankStr,
                            rate: service.rate,
                            serviceName: service.serviceName,
                            costPerDay: service.costPerDay,
                            categoryName: service.categoryName,
                        });
                    }));
                }));
                message.success("レポートの作成に成功しました");
                history.push(routeBuilder.reportDetailPath(createdReport.id));
            } else {
                message.error("レポートの作成に失敗しました");
            }
        }
    });

    return <form onSubmit={formik.handleSubmit}>
        {formik.values.ranks.map((rank, rankIdx) => {
            return (
                <div>
                    <div>ランク{convertRank(rankIdx)}</div>
                    <BorderLine />
                    <div>{rankMessage[rankIdx]}</div>
                    {rank.services.map((service, serviceIdx) => {
                        return (
                            <ServiceCard
                                serviceName={service.serviceName}
                                categoryName={service.categoryName}
                                serviceIndex={serviceIdx}
                                rankIndex={rankIdx}
                                values={formik.values}
                                handleChange={formik.handleChange}
                                formattedPrice={`¥${(service.costPerDay * ServiceUnitDaysEnum.Month).toLocaleString()}/月`}
                            />
                        )
                    })}
                </div>
            )
        })}
        <button type="submit">submit</button>
    </form>;
}