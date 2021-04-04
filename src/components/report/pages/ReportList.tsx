import PrivateRoute from "components/wrapper/PrivateRoute";
import { useReportQuery } from "hooks/ReportHooks";
import { useUser } from "hooks/UserHooks";
import { ReportListBoxType } from "../organisms/ReportListBox";
import ReportListTemplate from "../templates/ReportListTemplate";
import dateFormat from "dateformat";
import { ServiceUnitDaysEnum } from "entities/Service";

export default function ReportList() {
    // const mock: ReportListBoxType[] = [
    //     {
    //         reportID: "hogehoge",
    //         date: "2020/01/01",
    //         formattedCost: "¥15,000",
    //         comment: "モックコメントです",
    //         score: 23,
    //     }
    // ]
    const { currentUser } = useUser();
    const { reportList } = useReportQuery(currentUser?.uid)
    let reports: ReportListBoxType[] = []
    const format = "yyyy/mm/dd";

    if (reportList) {
        reports = reportList.map((report) => {
            let date: string = "";
            if(report.createdAt) {
                date = dateFormat(report.createdAt.toDate(), format);
            }
            return {
                reportID: report.id || "",
                comment: report.resultComment || "振り返りコメントなし",
                date: date,
                formattedCost: report.totalCostPerDay ? `¥${(Math.round(report.totalCostPerDay * ServiceUnitDaysEnum.Month)).toLocaleString()}/月` : "",
                score: report.score || 0,
            }
        })
    }
    return <PrivateRoute>
        <ReportListTemplate
            data={reports}
        />
    </PrivateRoute> ;
}