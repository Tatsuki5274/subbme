import Result404 from "components/common/organisms/404";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import { Report } from "entities/Report";
import { ReportService } from "entities/ReportService";
import { useEffect, useState } from "react";
import { ReportManager } from "repositories/Reports";
import { ReportServiceManager } from "repositories/ReportServices";
import ReportDetailTemplate from "../templates/ReportDetailTemplate";

function useReportServiceList(reportID: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaingGet, setIsLoadingGet] = useState(true);
  const [isLoaingList, setIsLoadingList] = useState(true);
  const [report, setReport] = useState<Report | null>(null);
  const [reportServiceList, setReportServiceList] = useState<ReportService[]>(
    []
  );
  // 各サービスの結果データを取得
  useEffect(() => {
    (async () => {
      const manager = new ReportServiceManager(reportID);
      const result = await manager.query();
      setReportServiceList(result || []);
      setIsLoadingList(false);
    })();
  }, [reportID]);

  // レポートを取得
  useEffect(() => {
    (async () => {
      const manager = new ReportManager();
      const result = await manager.get(reportID);
      setReport(result);
      setIsLoadingGet(false);
    })();
  }, [reportID]);

  // 読み込み状態を制御
  useEffect(() => {
    setIsLoading(isLoaingGet || isLoaingList);
  }, [isLoaingGet, isLoaingList]);
  return {
    isLoading,
    report,
    reportServiceList,
  };
}

export default function ReportDetail(props: {
  match: {
    params: {
      reportID: string;
    };
  };
}) {
  const { isLoading, report, reportServiceList } = useReportServiceList(
    props.match.params.reportID
  );
  if (isLoading) {
    return <LoadingScreen />;
  } else if (!report) {
    return <Result404 />;
  }
  const data = {
    score: report.score || 0,
    recommend: {
      comment: report.advice?.comment,
      link: report.advice?.actionLink,
    },
    serviceListA: reportServiceList.filter((sv) => {
      return sv.rank === "A";
    }),
    serviceListB: reportServiceList.filter((sv) => {
      return sv.rank === "B";
    }),
    serviceListC: reportServiceList.filter((sv) => {
      return sv.rank === "C";
    }),
  };
  return <ReportDetailTemplate {...data} />;
}
