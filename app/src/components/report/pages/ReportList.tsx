import PrivateRoute from "components/wrapper/PrivateRoute";
import { useUser } from "hooks/UserHooks";
import { ReportListBoxType } from "../organisms/ReportListBox";
import ReportListTemplate, {
  ReportListChartType,
} from "../templates/ReportListTemplate";
import dateFormat from "dateformat";
import { ServiceUnitDaysEnum } from "entities/Service";
import { useEffect, useState } from "react";
import { Report } from "entities/Report";
import { ReportDao } from "repositories/Reports";
import LoadingScreen from "components/common/organisms/LoadingScreen";

const useReport = (uid: string | null) => {
  const [reportList, setReportList] = useState<Report[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      let result: Report[] | null = null;
      if (uid) {
        // 文字が入力された場合はユーザーIDとして解釈する
        result = await ReportDao.query((ref) =>
          ref.where("userID", "==", uid).orderBy("createdAt", "desc")
        );
        setIsLoading(false);
        if (result && result?.length > 0) {
          setReportList(result);
        }
      }
    })();
  }, [uid]);
  return {
    reportList,
    isLoading,
  };
};

export default function ReportList() {
  const { currentUser } = useUser();
  const { reportList, isLoading } = useReport(currentUser?.uid || null);
  let reports: ReportListBoxType[] = [];
  const reportsChart: ReportListChartType[] = [];
  const format = "yyyy/mm/dd";

  if (isLoading) return <LoadingScreen />;
  if (reportList) {
    reports = reportList.map((report) => {
      let date = "";
      if (report.createdAt) {
        date = dateFormat(report.createdAt.toDate(), format);
      }
      return {
        reportID: report.id || "",
        comment: report.resultComment || "振り返りコメントなし",
        date: date,
        formattedCost: report.totalCostPerDay
          ? `¥${Math.round(
              report.totalCostPerDay * ServiceUnitDaysEnum.Month
            ).toLocaleString()}/月`
          : "",
        score: report.score || 0,
      };
    });

    reportList.forEach((report) => {
      if (report.createdAt) {
        reportsChart.push({
          score: report.score || 0,
          date: report.createdAt.toDate(),
        });
      }
    });
  }
  return (
    <PrivateRoute>
      <ReportListTemplate boxData={reports} chartData={reportsChart} />
    </PrivateRoute>
  );
}
