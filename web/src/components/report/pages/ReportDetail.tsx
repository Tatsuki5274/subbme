import { ReportService } from "entities/ReportService";
import { useEffect, useState } from "react";
import { ReportServiceManager } from "repositories/ReportServices";
import ReportDetailTemplate from "../templates/ReportDetailTemplate";

function useReportServiceList(reportID: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [reportServiceList, setReportServiceList] = useState<ReportService[]>(
    []
  );
  useEffect(() => {
    (async () => {
      const manager = new ReportServiceManager(reportID);
      const result = await manager.query();
      console.log("result", result);
    })();
  });
  return {
    isLoading,
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
  const { isLoading, reportServiceList } = useReportServiceList(
    props.match.params.reportID
  );
  const mockServiceList: ReportService[] = [
    {
      id: "hoge",
      serviceName: "DropBox",
      costPerDay: 50,
      rate: -1,
      categoryName: ["保険", "自動車保険"],
      rank: "A",
    },
  ];
  const mock = {
    score: 10,
    recommend: {
      comment: "テストコメント",
      link: "hogehoge",
    },
    serviceListA: mockServiceList,
    serviceListB: [],
    serviceListC: [],
  };
  return <ReportDetailTemplate {...mock} />;
}
