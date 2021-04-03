import PrivateRoute from "components/wrapper/PrivateRoute";
import ReportListTemplate from "../templates/ReportListTemplate";

export default function ReportList() {
    return <PrivateRoute>
        <ReportListTemplate />
    </PrivateRoute> ;
}