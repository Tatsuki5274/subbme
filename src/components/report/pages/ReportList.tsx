import PrivateRoute from "components/wrapper/PrivateRoute";
import { ReportListBoxType } from "../organisms/ReportListBox";
import ReportListTemplate from "../templates/ReportListTemplate";

export default function ReportList() {
    const mock: ReportListBoxType[] = [
        {
            date: "2020/01/01",
            cost: "¥15,000",
            comment: "モックコメントです",
            score: 23,
        }
    ]
    return <PrivateRoute>
        <ReportListTemplate
            data={mock}
        />
    </PrivateRoute> ;
}