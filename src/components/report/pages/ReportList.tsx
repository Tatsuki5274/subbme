import LoadingScreen from "components/common/organisms/LoadingScreen";
import PrivateRoute from "components/wrapper/PrivateRoute";
import { useReportQuery } from "hooks/ReportHooks";
import { useUser } from "hooks/UserHooks";
import { ReportListBoxType } from "../organisms/ReportListBox";
import ReportListTemplate from "../templates/ReportListTemplate";

export default function ReportList() {
    const mock: ReportListBoxType[] = [
        {
            reportID: "hogehoge",
            date: "2020/01/01",
            formattedCost: "¥15,000",
            comment: "モックコメントです",
            score: 23,
        }
    ]
    const { currentUser } = useUser();
    const { isEmpty, isLoading, reportList } = useReportQuery(currentUser?.uid)
    console.log(reportList)
    return <PrivateRoute>
        <ReportListTemplate
            data={mock}
        />
    </PrivateRoute> ;
}